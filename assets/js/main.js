// ===============================================
//                 JS_api_Uebung
// ===============================================

const newImgBtn = document.querySelector('#newImgBtn');
const galleryContainer = document.body.querySelector('#galleryContainer');

fetch(`https://picsum.photos/v2/list?page=0&limit=50`)
    .then(response => 
    {
        if(response.ok === false)
        {
            throw new Error("Something went wrong");
        }
        return response.json()
    })
    .then(data =>
    {
        createGallery(data);
    })
    .catch(error => console.log(error));

const createGallery = (piscumData) =>
{
    galleryContainer.innerHTML = "";
    piscumData.forEach(figure => 
    {
        const figureElt = document.createElement('figure');
        const img = document.createElement('img');
        const figCaption = document.createElement('figcaption');
        const button = document.createElement('button');
        button.textContent = "See more";

        galleryContainer.append(figureElt);
        img.src = `${figure.download_url}`;
        figCaption.textContent = figure.author;
        figureElt.append(img, figCaption, button);

        button.addEventListener('click', () =>
        {
            window.open(`${figure.url}`);
        });
    })
}  

let pageParam = 1;

newImgBtn.addEventListener('click', () =>
{
    
    pageParam++
    if(pageParam > 20)
    {
        pageParam = 0;
    }

    fetch(`https://picsum.photos/v2/list?page=${pageParam}&limit=50`)
    .then(response => 
    {
        if(response.ok === false)
        {
            throw new Error("Oops, something went wrong");
        }
        return response.json()
    })
    .then(data =>
    {
        createGallery(data);
    })
    .catch(error => window.confirm(error));
})
