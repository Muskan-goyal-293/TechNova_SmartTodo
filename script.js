const allElements = document.querySelectorAll(".allElements");
allElements.forEach((elem)=>{
    elem.addEventListener("click",()=>{
        const ContentBox = document.querySelectorAll(".ContentBox")[elem.id]
        ContentBox.style.display ="block"; 
        
        console.log(ContentBox)


    } )
})