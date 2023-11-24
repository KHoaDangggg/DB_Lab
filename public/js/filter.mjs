const ascPriceBtn = document.querySelector('.ascPrice');
const desPriceBtn = document.querySelector('.desPrice');

const paginationBtns = document.querySelectorAll('.paginationBtn');
const foodTypeBtns = document.querySelectorAll('.foodType-filter');
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


foodTypeBtns.forEach((btn) => {
    btn.onclick = addQuery({ foodType: btn.dataset.foodType });
});
paginationBtns.forEach((btn) => {
    btn.onclick = () => {
        const page = btn.dataset.page;
        addQuery({ page })();
    };
});
