const DummyDetailFunc = (judul) =>{
    const result = [];
    judul.split(" ").map((e)=>result.push({
        kata : e,
        idf : 0.5
    }));
    return result;
}

export default DummyDetailFunc;