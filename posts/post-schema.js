import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userName:String,
    userId: String,
    title: {
        type: String,

        default:"A Love Story: Lun and Wen's Journey",
        maxlength: [80, 'A post title must have fewer or equal to 80 characters'],
        minlength: [1, 'A post title must have more or equal to 1 characters']
    },
    location: {
        type: String,
        default:"Love Land",

    },

    date:{
        type: String,
        default:"2023-05-29",
    },


    imageBanner: {
        type: String,
        default: 'https://png.pngtree.com/background/20210711/original/pngtree-love-heart-background-picture-image_1156376.jpg'
    },
    image1: {
        type: String,
        default: 'https://www.ucdavis.edu/sites/default/files/styles/sf_landscape_16x9/public/images/article/getty-images-heart.jpg?h=0631a9cf&itok=VDpM95iX'   },
    image2: {
        type: String,
        default: 'https://guardian.ng/wp-content/uploads/2017/03/Love-vs-Logic.jpg' },


        image3: {
        type: String,
        default: 'https://images.healthshots.com/healthshots/en/uploads/2022/08/28211655/romance.jpg'   },

    details: {
        type: String,
        trim: true,
        default:"In the bustling halls of a university, amidst the chatter of students rushing to their next class, an unassuming love story began to unfold. Meet Lun and Wen, two individuals who, as fate would have it, started their journey as mere classmates but ended up discovering a profound connection that would change their lives forever." },

});


export default postSchema;
