export default function AIResult({result}){

    if(!result) return null;

    return(

        <div className="card">

            <h2>AI Analysis</h2>

            <div className="grid">

                {Object.entries(result).map(([key,value])=>(

                    <div className="item" key={key}>

                        <h4>{key.replace("_"," ")}</h4>

                        <p>{String(value)}</p>

                    </div>

                ))}

            </div>

        </div>

    )

}