const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
let newTitle = []
let word = []


function splitFromCap(string){

    class Node {
        constructor(val, prev){
            this.val = val
            //this.curr = curr
            // this.prevt = prevt
            this.prev = prev

            this.segre = () => {
                console.log("Current Value: " + this.val)
                //newTitle.unshift(this.val)
                word.unshift(this.val)

                //console.log(this.prev.val)

                // if(this.val == this.val.toLowerCase() && this.prev.val == this.prev.val.ToUpperCase()){
                //     console.log("Reached")
                //     newNext = new Node(",", new Node(" ", prev))
                //     this.val.prev = newNext
                // }

                try{
                    if((this.val == this.val.toUpperCase() && alphabet.includes(this.val)) && (this.prev.val == this.prev.val.toLowerCase() && alphabet.includes(this.prev.val.toUpperCase()))){
                        //const newPrev = new Node(" ", new Node(",", prev))
                        //this.prev = newPrev
                        newTitle.push(word)
                        word = []
                    }

                    //console.log("New Prev: " + this.prev.val)
                    this.prev.segre()
                } catch (TypeError){
                    console.log("End of linked list reached")
                    newTitle.push(word)
                    word = []
                }
            }
        }
    }

    let currNode = new Node('', '')
    
    string.forEach(cha => {
        let node = new Node(cha, currNode)
        //nodeList.push(node)
        currNode = node
        //console.log(currNode.val)
        //console.log(currNode.val + currNode.prev.val)

    })

    currNode.segre()
}


splitFromCap("HelloWorld".split(''))


for(i = 0; i < newTitle.length; i++){
    newTitle[i] = newTitle[i].join('')
}

newTitle.reverse()

console.log(newTitle)
