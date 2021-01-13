module.exports = function(app, fs) {
    app.get("/", function(req, res) {
        res.render("index.html");
    });
    app.get("/hot", (req, res) => {
        fs.readFile(__dirname + "/../data/hot.json", "utf8", function(err, data) {
            res.end(data);
        });
    });
    app.get("/carousel", (req, res) => {
        fs.readFile(__dirname + "/../data/carousel_promotion.json", "utf8", function(err, data) {
            res.end(data);
        });
    });
    app.get("/best", (req, res) => {
        fs.readFile(__dirname + "/../data/best_promotion.json", "utf8", function(err, data) {
            res.end(data);
        });
    });
    app.get("/basic", (req, res) => {
        fs.readFile(__dirname + "/../data/basic.json", "utf8", function(err, data) {
            res.end(data);
        });
    });
}