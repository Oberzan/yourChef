exports.homepage = (req, res) => {
  res.render('index', {
    title: 'YourChef'
  });
}