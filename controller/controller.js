import path from "path";
import fs from "fs/promises";


const filePath = path.join(process.cwd(),"data","cities.json");

async function  leerCities()
{
    try{
        const raw =  await fs.readFile(filePath,"utf8");
        return JSON.parse(raw);
    }catch(error)
    {
        return null;
    }
}

export const DocAPI = async (req,res)=>
    {
        res.status(200).json({
            status:200,
            message:"API de localidades de la provincia de buenos aires",
            data:{
                descripcion:" esta API permite consultar localidades por ID o por nombres.",
                endpoints:{
                    "/localidades":"Lista completa de localidades",
                    "/localidades/:id":"devuelve una localidad por ID",
                    "/localidades/buscar?nombre=xxxx":"buscar locallidades por nombre"
                }
            }
        });
    };
    //lista completa
    export const getLocalidades = async (req,res) => {
        const cities = await leerCities();
        if (!cities)
            {
                return res.status(500).json({
                    status:500,
                    mensaje:"error al leer el archivo cities.json",
                    data:null
                });
            }
        res.status(200).json({
            status:200,
            message:"lista completa de localidades",
            data:cities});
    };
//localidades pr ID

export const getLocalidadById = async (req, res)=>
    {
        const cities= await leerCities();
        const id = Number(req.params.id);

        if(!cities)
            {
                return res.status(500).json({
                    status:500,
                    message:"error al leer el archivo cities.json",
                    data:null
                });
            }

    
    const localidad = cities.find(l=>l.id===id);
    
    if(!localidad)
        {
            return res.status(404).json({
                status:404,
                message:"recurso no encontrado",
                data:null
            });
        }
    res.status(200).json({
        status:200,
        message:"localidad encontrada",
        data:localidad
    });
};
//buscar por nombre
export const buscarLocalidad= async (req,res)=>
    {
        const cities= await leerCities();
        const nombre = req.query.nombre?.toLowerCase();

        if(!cities)
            {
                return res.status(500).json({
                    status: 500,
                    message:"error al  leer archivo cities.json",
                    data:null
                })
            }
        if(!nombre){
            return res.status(400).json({
                status:400,
                message:"debe enviar el parametro 'nombre'",
                data:null
            })
        }
        const resultados = cities.filter(l=>l.nombre.toLowerCase().includes(nombre));
        if(resultados.length===0)
            {
                return res.status(404).json({
                    status:404,
                    message:"recurso no encontrado",
                    data:null
                });
            }
            res.status(200).json({
                status:200,
                message:"resultados de la busqueda",
                data:resultados
            });
    };
