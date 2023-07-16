class TrieNode { // trie structure
    constructor()
    {
        this.EndOfWord=false;
        this.children=new Array(26);
        for(let i=0;i<26;i++)
        {
            this.children[i]=null;
        }
    }
}

let root= new TrieNode();

function insert(key) { // Trie insertion
    let currentNode=root;
    let index;
    for(let i=0;i<key.length;i++)
    {
        index=key[i].charCodeAt(0)-'a'.charCodeAt(0);
        if(currentNode.children[index]==null)
        {
            //create new node
            currentNode.children[index]=new TrieNode();
        }
        currentNode= currentNode.children[index];
    }
    currentNode.EndOfWord=true;
}

function search(key) { // Trie search
    let currentNode=root;
    let index;
    for(let i=0;i<key.length;i++)
    {
        index=key[i].charCodeAt(0)-'a'.charCodeAt(0);
        if(currentNode.children[index]==null)
        {
           return false;
        }
        currentNode=currentNode.children[index]

    }
    return (currentNode.EndOfWord);
}

let A ='A', B = 'B', C = 'C', D = 'D', E = 'E', F = 'F', G = 'G',H = 'H',I = 'I',J = 'J',K = 'K',L = 'L',M = 'M',N = 'N',O = 'O',P = 'P',Q = 'Q',R = 'R',S = 'S',T = 'T', U = 'U',V = 'V',W = 'W',X = 'X',Y = 'Y',Z = 'Z'

let a = [O,R,B,I,T,F,J,T,E,R,M,I,N,A,T,O,R,T,H,B,N,P,R,O,P,U,L,S,I,O,N,N,D,R,E,T,O,X,U,L,A,A,Y,E,S,R,S,H,Y,B,T,N,Q,X,M,E,C,U,N,M,E,T,E,O,R,I,T,E,A,L,F,G,I,K,L,X,S,K,H,H,P,E,A,T,Q,L,F,A,N,O,N,W,E,H,G,V,X,N,C,T,T,P,P,C,E,N,T,R,I,F,U,G,E,D,B,E,S,E,S,Y,I,V,K,D,A,D,D,F,S,S,N,N,S,E,I,M,G,T,T,I,Y,H,P,O,R,T,A,I,I,R,O,T,A,O,Z,E,R,O,G,R,A,V,I,T,Y,E,C,G,U,Y,L,I,R,B,T,C,S,U,L,N,Q,H,Y,Z,S,A,U,O,Z,R,H,E,E,H,G,A,W,P,X,R,P,B,N,N,M,F,A,P,G,K,K,R,M,S,O,K,Z,U,E,O,E,S,K,F,A,H,W,A,C,O,Q,B,F,C,D,S,R,B,O,H,O,B,T,U,C,I,N,E,G,O,I,B,A,T,U,C,J,R,M,Q,M,B,E,T,I,L,L,E,T,A,S,L,S,I,M,U,L,A,T,O,R,Y,X,A,L,A,G,A,A]

let col = 17
let r = -1
let c = 0   
let temp = ''

var player = 'sss'
document.getElementById('sbmt').onclick = () =>{
player = document.getElementById('name').value 
document.getElementById('sec1').style.display = 'none'
document.getElementById('play').innerHTML = 'Player: '+player

console.log(player);

a.forEach((e,i) => {
    if (i%col == 0 && i != 0) {
        temp += '<br>'
        r +=1
        c = 0
    }

    let id = String(r)+String(c)

    temp += `<div id="${id}" data-row="${r}" data-col="${c}" class="box" data-val="${e}" data-name="puzzle">
                ${e}
            </div>`
    c++

});

let input=['ZERO','PROPULSION','FOAM','GALAXY','MAY']

for(let j=0;j<input.length;j++) { // Trie insertion
    insert(input[j]);
}


// ['ASTRONAUT','HOMINID','QUARANTINE','ATROPHY','LEGACY','SATELLITE','BAY','METEOR','SIMULATOR','BIOGENIC','METEORITE','STARS','BIOSPHERE','NEBULA','TERMINATOR','CENTRIFUGE',

// 'NUCLEUS','TERRAFORM','COSMOLOGY','ORBIT','THRUST','G-FORCE','PLANET','TRANSGENICS', ,'PROPULSION','ZERO','GRAVITY'];

let list = ''

input.forEach((e,i) => {
    list += `<h6 id='${e}'>${i+1}. ${e}</h6>`
});

document.getElementById('words').innerHTML = list


let main = document.getElementById('main').innerHTML = temp
let pr = null
let pc = null
let dir = null
let word = ''
let start = false
let timer = 0
let selected = []
let intv = null

document.addEventListener('click', (e) => {
  
    if (e.target.dataset.name == 'puzzle')
    if (pr == null){
        console.log(player);
        if (!start) {
            intv = setInterval(() => {
                timer += 1; 
                let sec = timer
                let min = 0
                while(sec > 60) {
                    min += 1
                    sec -= 60
                }
                if(sec < 10) sec = '0' + sec
                document.getElementById('timer').innerHTML = '0' + min + ':' + sec
            },1000)
            start = true
        }

        selected.push(e.target)

        word += e.target.dataset.val
        pr = Number(e.target.dataset.row)
        pc = Number(e.target.dataset.col)

        console.log('word:',word,' row:',pr,' col:',pc);
    } else if (dir == null) {
        let tpr = Number(e.target.dataset.row)
        let tpc = Number(e.target.dataset.col)
        let a = tpr
        let b = tpc

        if (Math.abs(tpc-pc) >1 || Math.abs(tpr-pr) > 1 || (tpc == pc && tpr == pr)) {
            window.alert('choose an adjacent letter!!')
            return
        } else {
            word += e.target.dataset.val
            if (tpc == pc){
                if (pr + 1 == tpr) dir = 'cd'
                else dir = 'cu' 
            } else if (tpr == pr) {
                if (pc  == tpc + 1) dir = 'rl'
                else dir = 'rr' 
            } 
            else if (tpr == pr + 1 && tpc == pc + 1) dir = 'dr'
            else if (tpr + 1 == pr && tpc + 1 == pc) dir = 'ul'
            else if (tpr == pr + 1 && tpc + 1 == pc) dir = 'dl'
            else if (tpr + 1 == pr && tpc == pc + 1) dir = 'ur'

            pc = b
            pr = a

            console.log('word:',word,' row:',pr,' col:',pc);

            selected.push(e.target)
        }  
    } else  {
        let tpr = Number(e.target.dataset.row)
        let tpc = Number(e.target.dataset.col)


        if (Math.abs(tpc-pc) >1 || Math.abs(tpr-pr) > 1 || (tpc == pc && tpr == pr)) window.alert('choose an adjacent letter!!')
        else {
            let alert = false

            switch (dir) {
                case 'cd':
                    if (!(pc == tpc && pr + 1 == tpr)) alert = true
                    break;
                case 'cu':
                    if (!(pc == tpc && pr == tpr + 1)) alert = true
                    break;
                case 'rl':
                    if (!(pr == tpr && pc == tpc + 1)) alert = true
                    break;                
                case 'rr':
                    if (!(pr == tpr && pc + 1 == tpc)) alert = true
                    break;
                case 'ur':
                    if (!(tpr + 1 == pr && tpc == pc + 1)) alert = true
                    break;
                case 'dl':
                    if (!(tpr == pr + 1 && tpc + 1 == pc)) alert = true
                    break;
                case 'ul':
                    if (!(tpr + 1 == pr && tpc + 1 == pc)) alert = true
                    break;                
                case 'dr':
                    if (!(tpr == pr + 1 && tpc == pc + 1)) alert = true              
                    break;
                default:
                    console.log('defff');
                    break;
            }

            if (alert) {
                window.alert('choose letters in a single direction!!')          
                alert = false 
            } else {
                selected.push(e.target)
                word += e.target.dataset.val
                pc = tpc
                pr = tpr
            }
        }

        console.log('word:',word,' row:',pr,' col:',pc);
    }

    selected.forEach(e => e.style.backgroundColor = 'cornflowerblue')
})  

document.getElementById('submit').onclick = () => {
    console.log('submitted word: ',word)
    console.log('timer',timer);

    if (search(word)) {
        input = input.filter(e => e == word ? false : true)
        console.log(input);
        correct(word);
    } 
    else incorrect()

    word = ''
    pc = pr = dir = null
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const correct = async (word) => {
    document.getElementById(word).style.display = 'none'
    let color = '#' + Math.floor(Math.random()*16777215).toString(16)
    selected.forEach(e => e.style.backgroundColor = color )
    selected = []

    if (input.length == 0) dwin()
    else dcorrect()
}

const incorrect = () => {
    selected.forEach(e => e.style.backgroundColor = 'darkcyan')
    selected = []

    dwrong()
}

const dcorrect = async () => {
    document.getElementById('backg1').style.visibility = 'visible'
    await sleep(1000)
    document.getElementById('backg1').style.visibility = 'hidden'
}

const dwin = async () => {
    document.getElementById('backg2').style.visibility = 'visible'
    await sleep(700)
    document.getElementById('backg2').style.visibility = 'hidden'
    document.getElementById('sec2').style.display = 'none'
    clearInterval(intv)
    fillLb(timer,player)
}

const dwrong = async () => {
    document.getElementById('backg3').style.visibility = 'visible'
    await sleep(700)
    document.getElementById('backg3').style.visibility = 'hidden'
}

}

let leaderboard = [
    {name:'john doe',time:120},{name:'vanshika shah',time:80},{name:'vidhi sharma',time:35},{name:'siddhant rao',time:95}
]

const fillLb = (time,name) => {
    leaderboard.push({name:name,time:time})
    heapSort(leaderboard)

    let temp = ''

    leaderboard.forEach(({name,time}) => {
        let sec = time
        let min = 0

        while(sec >= 60) {
            min += 1
            sec -= 60
        }

        if(sec < 10) sec = '0' + sec

        temp += `<tr>
                    <td>${name}</td>
                    <td>${min+':'+sec}</td>
                </tr>`
    })

    document.querySelector('tbody').innerHTML = temp

}

function heapSort(arr) { // heapsort function
    var size = arr.length;
    
    for (var i = Math.floor(size / 2) - 1; i >= 0; i--)
        min_heapify(arr, size, i);
    
    for (var i = size - 1; i > 0; i--) {
        
        var temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
    
        min_heapify(arr, i, 0);
    }
}


function min_heapify(arr, size, i) { // heapify function
    var largest = i; 
    var l = 2 * i + 1; 
    var r = 2 * i + 2; 
    
    if (l < size && arr[l].time > arr[largest].time)
        largest = l;
    
    if (r < size && arr[r].time > arr[largest].time)
        largest = r;
    
    if (largest != i) {
        var swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        
        min_heapify(arr, size, largest);
    }
}