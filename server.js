import * as dotenv from 'dotenv'
import express from 'express';
import multer from 'multer';
import path from 'path';

dotenv.config()
const app = express();

// cria uma instância do middleware configurada
const storage = multer.diskStorage({
    // lida com o destino 
    destination: function(request, file, callback) {
        // error first callback
        callback(null, 'uploads/');
    },
    // permite definir o nome do arquivo gravado
    filename: function (request, file, callback) {
        // error first callback
        // salvando com um nome diferente
        // callback(null, `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`);
        // salvando com o nome original
        callback(null, file.originalname);
    }
});

// utiliza a storage para configurar a instância do multer
const upload = multer({ storage });

app.use(express.static('public'));

// rota indicada no action do form
app
    .post('/file/upload', upload.single('file'), (request, response) => {
        response.status(200).send('<h2>Upload realizado com sucesso!</h2>');
    })

app.listen( 
    process.env.PORT, 
    () => console.log(`App na porta ${process.env.PORT}`)
);