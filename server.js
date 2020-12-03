

//('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connect="mongodb+srv://anelson0112:10qpalzm7YGV@taskcluster.7xytg.mongodb.net/TaskListdb?retryWrites=true&w=majority"





async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);