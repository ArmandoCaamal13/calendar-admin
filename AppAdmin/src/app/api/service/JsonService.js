
export const GetSeoJson = async () => {
    try {
        const response = await fetch(`https://localhost:7170/cdn/seoxml`);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return null;
    }
}

export const GuardarJson = async (updatedJsonData) => {
    try {
        const response = await fetch(`https://localhost:7170/cdn/guardarjson`, {
           method: 'POST' ,
           headers: {
            'Content-Type': 'application/json',
           },
           body: JSON.stringify(updatedJsonData)
        }) 
        if (response.ok) {
            return 'Datos enviados correctamente'
            
        }else{
            return 'Datos no enviados '
        }

    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return null;
    }
}