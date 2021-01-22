module.exports = function (app, fs) {
    let carouselData;
    let bestData;
    let hotData;
    let basicData;
    let categoryData;
    let wordData;
    let topSearchedData;

    fs.readFile(__dirname + "/../data/carousel_promotion.json", "utf8", function (err, data) {
        carouselData = data;
    });
    fs.readFile(__dirname + "/../data/best_promotion.json", "utf8", function (err, data) {
        bestData = data;
    });
    fs.readFile(__dirname + "/../data/hot.json", "utf8", function (err, data) {
        hotData = data;
    });
    fs.readFile(__dirname + "/../data/basic.json", "utf8", function (err, data) {
        basicData = data;
    });
    fs.readFile(__dirname + "/../data/category.json", "utf8", function (err, data) {
        categoryData = data;
    });
    fs.readFile(__dirname + "/../data/word.json", "utf8", function (err, data) {
        wordData = data;
    });
    fs.readFile(__dirname + "/../data/top-searched.json", "utf8", function (err, data) {
        topSearchedData = data;
    });
    /* app.get("/", function(req, res) {
        res.render("index.html");
    }); */

    app.get("/hot", (req, res) => {
        res.end(hotData);
    });
    app.get("/carousel", (req, res) => {
        res.end(carouselData);
    });
    app.get("/best", (req, res) => {
        res.end(bestData);
    });
    app.get("/basic", (req, res) => {
        const idx = +req.query.idx;
        const cnt = +req.query.cnt;

        const items = JSON.parse(basicData).items;
        const basic = {
            items: []
        }
        basic.items = items.slice(idx, idx + cnt);
        res.end(JSON.stringify(basic));
    });
    app.get("/category", (req, res) => {
        res.end(categoryData);
    });
    app.get("/word", (req, res) => {
        const keyword = req.query.keyword;
        if (keyword) {
            const result = { data: [], idx: [] };
            for (let word of JSON.parse(wordData).data) {
                const k = keyword.replace(/(\s*)/g, "").split("").join("\\s?");
                const reg = new RegExp(k);
                const idx = word.search(reg);
                if (idx !== -1) {
                    result.data.push(word);
                    result.idx.push(idx);
                    if (result.data.length === 10) break;
                }

            }
            console.log(keyword, result.data);
            res.end(JSON.stringify(result));
        }
        else res.end(topSearchedData);
    });
}