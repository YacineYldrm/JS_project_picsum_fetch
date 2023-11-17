// ===============================================
//                 JS_api_Uebung
// ===============================================

const newImgBtn = document.querySelector('#newImgBtn');
const galleryContainer = document.body.querySelector('#galleryContainer');

let pageParam = Math.ceil(Math.random() * 20);

const fetchRequest = () =>
{
    fetch(`https://picsum.photos/v2/list?page=${pageParam}&limit=50`)
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
            renderItems(data);
        })
        .catch(error => console.log(error));
}

fetchRequest();

const renderItems = (picsumData) =>
{
    galleryContainer.innerHTML = "";
    picsumData.forEach(figure => 
    {
        const figureElt = document.createElement('figure');
        const img = document.createElement('img');
        const figCaption = document.createElement('figcaption');
        const button = document.createElement('button');
        button.textContent = "See more";

        galleryContainer.append(figureElt);
        img.setAttribute('src', figure.download_url);
        img.setAttribute('alt', `Ein Bild von ${figure.author}`);
        figCaption.textContent = figure.author;
        figureElt.append(img, figCaption, button);

        button.addEventListener('click', () => window.open(`${figure.url}`))
    })
}  

newImgBtn.addEventListener('click', () =>
{
    pageParam++
    
    if(pageParam > 20)
    {
        pageParam = 1;
    }

    fetchRequest();
});
