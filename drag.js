const container=document.querySelector(".img")
const time=document.querySelector(".time")
const start=document.querySelector(".start")
const tile=document.querySelectorAll(".img>li")
const cheat=document.querySelector(".cheat")
const text=document.querySelector(".gametext")
let timer=0;
let count;


const shuffle=(frag)=>{
    
    const ran=Math.floor(Math.random()*(frag.length));
    let index=frag.length-1;
    while(index>0)
    {
        [frag[index],frag[ran]]=[frag[ran],frag[index]]
        index--;
    }
    container.innerHTML=""
    frag.forEach(tile=>{container.appendChild(tile)})
    count=setInterval(()=>{
        timer++;
        time.innerText=timer;
    },1000)
    
}
const dragged={
    el:null,
    class:null,
    index:null,
}
const check=()=>{
    const cur=[...container.children]
    const unmatch= cur.filter((list,index)=>{
        return Number(list.getAttribute("data-type"))!==index
    })
    if(unmatch.length===0){
        text.style.display="block";
        clearInterval(count);
    }
}


container.addEventListener("dragstart",e=>{
    const obj=e.target;
    
    dragged.el=obj;
    dragged.class=obj.className;
    dragged.index=[...obj.parentNode.children].indexOf(obj);
})
container.addEventListener("dragover",e=>{
    e.preventDefault()
})
container.addEventListener("drop",e=>{
    const obj=e.target
    let last=false;
    let origin
    if(dragged.el.nextSibling){
        origin=dragged.el.nextSibling;

    }
    else{
        origin=dragged.el.previousSibling;
        last=true;
    }
    dragged.index>[...obj.parentNode.children].indexOf(obj)? obj.before(dragged.el): obj.after(dragged.el);
    last?origin.after(obj):origin.before(obj);
    check();
    
})
start.addEventListener("click",()=>{
    tile.forEach((list,index)=>{
        list.innerText="";
        console.log(list)

    })
    
    text.style.display="none";
    clearInterval(count);
    shuffle([...tile])
    timer=0;
    
})
cheat.addEventListener("click",()=>{
    tile.forEach((list,index)=>{
        list.innerText=index;

    })
})

tile.forEach((list,index)=>{
   
    console.log(list.getAttribute("data-type"))

})