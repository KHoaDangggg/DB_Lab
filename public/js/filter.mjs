const ascPriceBtn = document.querySelector('.ascPrice');
const desPriceBtn = document.querySelector('.desPrice');

const priceBtns = document.querySelectorAll('.price-filter');

const paginationBtns = document.querySelectorAll('.paginationBtn');

let query;


const addQuery = (attributes) => () => {
    const req = document.querySelector('.contain-req');
    query = JSON.parse(req.dataset.query);
    const keys = Object.keys(attributes);
    if (Object.keys(query).includes('page')) {
        delete query.page;
        delete query.limit;
    }
    keys.forEach((key) => {
        query[key] = attributes[key];
    });
    const queryString = Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
    const url = `${req.dataset.path}?${queryString}`;
    window.location.replace(url);
};
ascPriceBtn.onclick = addQuery({ sort: 'ASC' });
desPriceBtn.onclick = addQuery({ sort: 'DESC' });
// priceBtns.forEach((btn) => {
//     btn.onclick = addQuery({
//         minPrice: btn.dataset.minprice,
//         maxPrice: btn.dataset.maxprice,
//     });
// });

// manufacturerBtns.forEach((btn) => {
//     btn.onclick = addQuery({ manufacturer: btn.dataset.manu });
// });
paginationBtns.forEach((btn) => {
    btn.onclick = () => {
        const page = btn.dataset.page;
        addQuery({ page })();
    };
});
