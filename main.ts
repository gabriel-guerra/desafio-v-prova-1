import app from "./app";

export default function main(){
    let port = 3000;
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    })
}

main();