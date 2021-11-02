import express from 'express';
import path from 'path';

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => res.render('home'));

const handleListen = () => {
  console.log(`✅ server starting PORT:${PORT}`);
};

app.listen(PORT, handleListen);
