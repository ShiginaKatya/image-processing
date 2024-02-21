
    
document.addEventListener('DOMContentLoaded', () => {  

    let callBackButton = document.getElementById('callback-button');
    let closeButton = document.getElementById('close-button');
    let resetButton = document.getElementById('reset-button');
    let modal1 = document.getElementById('modal-1');
    let subButton = document.getElementById('sub');

//  // Тег body для запрета прокрутки
//  let tagBody = document.getElementsByTagName('body');

    let iF = document.getElementById('i-f');
    let iU = document.getElementById('i-u')
//  iF.addEventListener('input', function (e) {
// 	if (e.target.value) {
//   	iU.setAttribute('disabled', true);
//   } else {
//   	iU.removeAttribute('disabled');
//   }
// });

// function clearForm() {
    
//     document.getElementById('iF').value = '';
//     document.getElementById('iU').value = '';
//   }

// iU.addEventListener('input', function (e) {
// 	if (e.target.value) {
//   	iF.setAttribute('disabled', true);
//   } else {
//   	iF.removeAttribute('disabled');
//   }
// });

    callBackButton.addEventListener("click", (e) =>{
        e.preventDefault();
        modal1.classList.add('modal_active');

    })

    closeButton.addEventListener("click", (e) =>{
        e.preventDefault();
        modal1.classList.remove('modal_active');
    })

    const imgForm = document.querySelector("#image-form");
    imgForm.addEventListener("submit", showFile)

    function showFile(e) {
        e.preventDefault();
        modal1.classList.remove('modal_active');
        // imgForm.reset()
        
        const fd = new FormData(e.target);
        const fdEntries = [...fd.entries()];
        imgForm.reset()
        const img = new Image()
        // file = fdEntries[1][1];
        let file = ""
        let ob = ""
            
        if (fdEntries[0][1].name !== '') {
            file = fdEntries[0][1];
            objectURL = URL.createObjectURL(file);
            ob = objectURL
            console.log(ob)
         }
        if (fdEntries[1][1] !== '' ){
            file = fdEntries[1][1]
            ob=file
            console.log(file)
        }   

        console.log(ob)
        img.crossOrigin = "Anonymous";
        img.src = ob

        const canvas = document.getElementById("image");
        const context = canvas.getContext("2d");
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
            document.querySelector('.size').textContent = `${canvas.width} x ${canvas.height}`;
        }
        // document.querySelector('.size').innerHTML = `Width: ${canvas.width*2}, Height: ${canvas.height*2}`;
                
    }
    const canvas = document.getElementById("image");
    canvas.addEventListener('pointermove', (e) => {
        const ctx = canvas.getContext("2d");
        const x = e.offsetX;
        const y = e.offsetY;
        const img_data = ctx.getImageData(x, y, 1, 1);//ImageData
        const pix = img_data.data;
        // console.dir(pix)
        const red = pix[0];
        const green = pix[1];
        const blue = pix[2];
        const alpha = pix[3];
            
        document.querySelector('.rgb').textContent = `R: ${red}, G: ${green}, B: ${blue}`;
        document.querySelector('.color-real').style.backgroundColor = `rgba(${pix.join(',')})`
        document.querySelector('.coordinate').textContent = `X: ${x.toFixed(0)}, Y: ${y.toFixed(0)}`;
            // document.querySelector('.size').innerHTML = `Width: ${canvas.width*2}, Height: ${canvas.height*2}`;
            // document.querySelector('.container').style.height = canvas.height/2; 
        })
});
