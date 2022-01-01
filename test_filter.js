const { prev } = require("cheerio/lib/api/traversing")

let filterString = (string) => {

    let nodeList = []

    let cutoffString = (splitter) => {

    }

    // let stringList = []
    // string.forEach(cha => {
    //     stringList.push(cha)
    //     console.log(stringList.toString().replace(/,/g, ''))
    //     if(stringList.toString().replace(/,/g, '').includes("Hello ")){
    //         console.log("Clearing")
    //         stringList = []
    //     }
    // })
    //
    //console.log(stringList)

    class Node {
        constructor(val, prev){
            this.val = val
            //this.curr = curr
            // this.next = next
            this.prev = prev

            this.travel = () => {
                console.log(val)
                //console.log(prev.val)
                try{
                    prev.travel()
                } catch (TypeError){
                    console.log("End of linked list reached")
                }
            }
        }
    }

    let currNode = new Node('', '')
    
    string.forEach(cha => {
        let node = new Node(cha, currNode)
        //nodeList.push(node)
        currNode = node
        console.log(currNode.val + currNode.prev.val)
    })

    console.log("Code is functioning")
    //console.log(nodeList[nodeList.length - 1])
    
    //Travel function made to confirm rather or not the list had been creaed
    //nodeList[nodeList.length - 1].travel()

}

//filterString("Hello, world".split(''))

// if ("Hello World".includes("Hello")) console.log("True")
//     else console.log("False")

filterString("Hello, world".split(''))