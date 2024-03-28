
    
document.addEventListener('DOMContentLoaded', () => {  

    let callBackButton = document.getElementById('callback-button');
    let closeButton = document.getElementById('close-button');
    let resetButton = document.getElementById('reset-button');
    let modal1 = document.getElementById('modal-1');
    let subButton = document.getElementById('sub');
    let scaleButton = document.getElementById('scale-button');
    let scaleDialog = document.getElementById('scale-dialog');
    let closeDialog = document.getElementById('close-dialog');
    let saveButton = document.getElementById('save-button');
    let numWidth = document.getElementById('numWidth');
    let numHeight = document.getElementById('numHeight');
    let selectMe = document.getElementById('measure');
    let keyCheck = document.getElementById('key');
    let confirmButton = document.getElementById('confirm');
    let scaleForm = document.getElementById('scale-form')
    let scaleRange = document.getElementById('scale');
//  // Тег body для запрета прокрутки
//  let tagBody = document.getElementsByTagName('body');

    let iF = document.getElementById('i-f');
    let iU = document.getElementById('i-u');
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

    // scaleButton.addEventListener("click", function(){
    //     scaleDialog.showModal();
    // })
    // closeDialog.addEventListener("click", function(){
    //     scaleDialog.close();
    // })

    closeButton.addEventListener("click", (e) =>{
        e.preventDefault();
        modal1.classList.remove('modal_active');
    })

    const imgForm = document.querySelector("#image-form");
    imgForm.addEventListener("submit", showFile)
    let img = ''
    function showFile(e) {
        e.preventDefault();
        modal1.classList.remove('modal_active');
        // imgForm.reset()
        numHeight.value = ''
        numWidth.value = ''
        scaleRange.value = 100
        document.querySelector('.range-value').textContent = `${scaleRange.value}%`
        document.querySelector('.scale-size').textContent = ``
        const fd = new FormData(e.target);
        const fdEntries = [...fd.entries()];
        imgForm.reset()
        img = new Image()
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
        // img.onload = () => {
        //     canvas.width = img.width;
        //     canvas.height = img.height;
        //     context.drawImage(img, 0, 0, img.width, img.height);
        //     document.querySelector('.size').textContent = `${canvas.width} x ${canvas.height}`;
            // numWidth.value = canvas.width;
         img.onload = update   

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

    })
    
    saveButton.addEventListener("click", function(){
        saveButton.setAttribute("href", url);
        saveButton.setAttribute("download", `${url}.jpg`);
    })
    scaleButton.addEventListener("click", function(){
        scaleDialog.showModal();

    })
  
    selectMe.addEventListener("change", changeMe)
    function changeMe(){
        if (selectMe.value == 'px'){
            numWidth.value = widthNew
            numHeight.value = heightNew
        
        }
        if (selectMe.value == '%') {
            numWidth.value = (widthNew/img.width)*100;
            numHeight.value = (heightNew/img.height)*100;
        }
    }
    function selectMeasure(){
        console.log(widthNew)
        if (selectMe.value == 'px'){
            widthNew = numWidth.value;
            heightNew = numHeight.value;
        }
        if (selectMe.value == '%') {
            widthNew = (numWidth.value/100)*img.width;
            heightNew = (numHeight.value/100)*img.height;
        }
    }
    function updateValues(){
        if (keyCheck.checked){
            if (selectMe.value == 'px'){
                numHeight.value = numWidth.value / (img.width/img.height)
            }
            if (selectMe.value == '%'){
                numHeight.value = numWidth.value
            }
        }
    }
    keyCheck.addEventListener('change', updateValues);
    numWidth.addEventListener('input', updateValues);
    numHeight.addEventListener('input', updateValues);
    closeDialog.addEventListener("click", function(){
        scaleDialog.close();
    })
    let widthNew;
    let heightNew;
    function resizeImage(img){
        const width = img.width;
        const height = img.height;
        widthScale = img.width
        heightScale = img.height
        const src = new Uint32Array(img.data.buffer);
        // imgNew = Image()
        
        // let widthNew;
        // let heightNew;
        if (numHeight.value && numHeight.value){
            selectMeasure()
        
        }
        else{
            widthNew = img.width
            heightNew = img.height
        }
        changeMe()
        // imgNew = Image(widthNew, heightNew)
        // const dst = new Uint32Array(imgNew.data.buffer)
        processCanvas('image', widthNew, heightNew, function(dst) {
            const dx = width / widthNew;
            const dy = height / heightNew;
            for (let y = 0; y < heightNew; y++) {
              let srcY = Math.floor(y * dy);
              for (let x = 0; x < widthNew; x++) {
                let srcX = Math.floor(x * dx);
                dst[y * widthNew + x] = src[srcY * width + srcX];
              }
            }
          });
        }
    function processCanvas(canvasId, width, height, func) {
        const canvas = document.getElementById(canvasId);
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        const newImg = ctx.createImageData(width, height);
        const dst = new Uint32Array(newImg.data.buffer);
        func(dst);
        ctx.putImageData(newImg, 0, 0);
    }
    function getImageData(el){
        const canvas = document.getElementById("image");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        document.querySelector('.size').textContent = `${canvas.width} x ${canvas.height}`;
        return context.getImageData(0, 0, img.width, img.height);

    }
    
    confirmButton.addEventListener('click', function(){
        if (selectMe.value == 'px'){
            if (numHeight.value > img.height * 3){
                numHeight.value = img.height * 3
            }
            if (numWidth.value > img.width * 3){
                numWidth.value = img.width * 3
            }
        }
        if (selectMe.value == '%'){
            if (numHeight.value > 300){
                numHeight.value = 300
            }
            if (numHeight.value < 10){
                numHeight.value = 10
            }
            if (numWidth.value > 300){
                numWidth.value = 300
            }
            if (numWidth.value < 10){
                numWidth.value = 10
            }
        } 
        scaleDialog.close()
        scaleRange.value = 100
        update()
        document.querySelector('.scale-size').textContent = `${(canvas.width*canvas.height / 1000000).toFixed(2)} Mpx`
        document.querySelector('.range-value').textContent = `${scaleRange.value}%`
        
    })
    // scaleForm.addEventListener("submit", update)
    function update(e){
        resizeImage(getImageData(img))
        document.querySelector('.size').textContent = `${canvas.width} x ${canvas.height}`
        document.querySelector('.img-size').textContent = `${(img.width*img.height / 1000000).toFixed(2)} Mpx`
        canvas.toBlob(function (blob) {
            url = URL.createObjectURL(blob);})
        widthScale = canvas.width
        heightScale = canvas.height
        firstScale()
    }
    function changeScale(){
        const canvas = document.getElementById('image');
        document.querySelector('.range-value').textContent = `${scaleRange.value}%`
        let scale = scaleRange.value/100
        const ctx = canvas.getContext('2d')
        // const img = ctx.getImageData(0, 0, canvas.width, canvas.height)
        canvas.width = widthScale * scale;
        canvas.height = heightScale * scale;
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        // ctx.putImageData(img, 0, 0, 0, 0, canvas.width, canvas.height )
    }
    scaleRange.addEventListener('change', changeScale)
    function firstScale(){
        let scaleHeight = 100;
        let scaleWidth = 100;
        if (canvas.clientHeight > window.screen.availHeight-250){
            const ratio = (canvas.clientHeight) /(window.screen.availHeight-250)
            if (ratio > 1) {
                for (i=0.1;i<1;i+=0.1){
                    if (ratio*i>1){
                        scaleHeight = (i - 0.1)*100
                        break
                    }

                }
            }
        }
        if (canvas.clientWidth > window.screen.availWidth-100){
            const ratio = (canvas.clientWidth) /(window.screen.availWidth-100)
            if (ratio > 1) {
                for (i=0.1;i<1;i+=0.1){
                    if (ratio*i>1){
                        scaleHeight = (i - 0.1)*100
                        break
                    }

                }
            }
        }
        if ((scaleHeight != 100 )||(scale != 100)) {
            if (scaleHeight <= scaleWidth){
                scaleRange.value = scaleHeight
            }
            else{
                scaleRange.value = scaleWidth 
            }
            changeScale()
        }
        
    }

    
    
});
