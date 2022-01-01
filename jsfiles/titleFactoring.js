
function splitFromCap(string){

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    let newTitle = []    
    let title = []

    class Node {
        constructor(val, prev){
            this.val = val
            this.prev = prev

            this.segre = () => {
                //console.log("Current Value: " + this.val)

                try{
                    
                    if(this.val != ','){
                        title.unshift(this.val)
                    }


                    if((this.val == this.val.toUpperCase() && alphabet.includes(this.val)) && (this.prev.val == this.prev.val.toLowerCase() && alphabet.includes(this.prev.val.toUpperCase()))){
                        newTitle.unshift(title)
                        title = []
                    }
                    

                    //Exlude next character under certain conditions
                    if(!alphabet.includes(this.prev.val.toUpperCase()) && this.prev.val != " " && this.prev.val != "/" && this.prev.val != "'"){
                        newTitle.unshift(title)
                        title = []
                    }

                    this.prev.segre()

                } catch (TypeError){
                    //console.log("End of linked list reached")
                    //newTitle.push(word)
                    //word = []
                }
            }
        }
    }

    let currNode = new Node('', '')
    
    string.forEach(cha => {
        let node = new Node(cha, currNode)
        currNode = node
    })

    currNode.segre()

    for(i = 0; i < newTitle.length; i++){

        if(newTitle[i][0] == " "){
            newTitle[i].shift()
        }

        newTitle[i] = newTitle[i].join('')
    }
    
    return newTitle
}

exports.splitFromCap = splitFromCap