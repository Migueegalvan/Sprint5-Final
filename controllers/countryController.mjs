// controllers/countryController.mjs
import { obtenerTodosLosPaises, agregarPais, obtenerPaisPorId, actualizarPais,eliminarPais,fetchAndStoreCountries  } from "../services/countryService.mjs";

//obtener todos los paises de la bd y mostrarlo en la tabla
export async function obtenerTodosLosPaisesController(req, res) {
    try {
        const paises = await obtenerTodosLosPaises(); // Obtiene los países de la base de datos

        // Asegúrate de que todos los países tienen el campo creador
        paises.forEach(pais => {
            if (!pais.creador) {
                pais.creador = 'Galvan Miguel'; // Asigna tu nombre si el campo creador está vacío
            }
        });

        req.flash('success', 'Tabla de países cargada correctamente');
        res.render('dashboard', { title: 'Dashboard', paises }); // Renderiza la vista con los datos actualizados
    } catch (error) {
        console.error("Error al obtener los países:", error);
        res.status(500).send({ mensaje: "Error al cargar el dashboard" });
    }
}

//agregar un pais 
export async function agregarPaisController(req, res) {
    try {
        const nuevoPais = {
            name: {
                common: req.body.name_common,
                official: req.body.name_official,
                nativeName: {
                    spa: {
                        official: req.body.name_official,
                        common: req.body.name_common
                    }
                }
            },
            capital: [req.body.capital],//arreglo
            area: req.body.area,
            population: req.body.population,
            gini: req.body.gini ? { [req.body.gini]: req.body.gini } : {}, // aseguro de que el campo gini se incluya, clave - valor
            timezones: [req.body.timezones],//arreglo
            borders: req.body.borders ? req.body.borders.split(',').map(border => border.trim()) : [],//Convierte una lista de países vecinos (separados por comas) en un arreglo.
            creador: 'Galvan Miguel'
        };

        

        await agregarPais(nuevoPais);
        req.flash('success', 'País agregado correctamente');
        res.redirect('/api/countries');
    } catch (error) {
        console.error("Error al agregar el país:", error);
        res.status(500).send({ mensaje: "Error al agregar el país" });
    }
}

//obtener pais por id. Sirve para mostrar el pais seleccionado para su edicion 
export async function obtenerPaisPorIdController(req, res) {
    const { id } = req.params;
    const pais = await obtenerPaisPorId(id);

    if (pais) {
        res.render('editCountry', { title: 'Editar País', pais, messages: req.flash() });
    } else {
        res.status(404).send({ mensaje: "País no encontrado" });
    }
}

//editar pais 
export async function editarPaisController(req, res) {
    try {
        const { id } = req.params;
        const {
            name_common,
            name_official,
            capital,
            area,
            population,
            gini,
            timezones,
            borders
        } = req.body;

        const datosActualizados = {
            name: {
                common: name_common,
                official: name_official,
                nativeName: {
                    spa: {
                        official: name_official,
                        common: name_common
                    }
                }
            },
            capital: capital.split(',').map(cap => cap.trim()),
            area,
            population,
            gini: gini ? { [gini]: gini } : {}, // aseguro de que el campo gini se incluya
            timezones: timezones.split(',').map(tz => tz.trim()),
            borders: borders ? borders.split(',').map(border => border.trim()) : []
        };

        const paisActualizado = await actualizarPais(id, datosActualizados);

        if (paisActualizado) {
            req.flash('success', 'País actualizado correctamente');
            res.redirect('/api/countries');
        } else {
            res.status(404).send({ mensaje: "País no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar el país:", error);
        res.status(500).send({ mensaje: "Error al actualizar el país" });
    }
}

//eliminar pais 
export async function eliminarPaisController(req, res) {
    try {
        const { id } = req.params;
        const paisEliminado = await eliminarPais(id);

        if (paisEliminado) {
            req.flash('success', 'País eliminado correctamente');
            res.redirect('/api/countries');
        } else {
            res.status(404).send({ mensaje: "País no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar el país:", error);
        res.status(500).send({ mensaje: "Error al eliminar el país" });
    }
}

//consumo el API y redirecciono a la tabla de paises 
export async function fetchAndStoreCountriesController(req, res) {
    try {
        await fetchAndStoreCountries();
        req.flash('success', 'Países hispanohablantes almacenados correctamente');
        res.redirect('/api/countries');
    } catch (error) {
        console.error("Error al almacenar los países:", error);
        res.status(500).send({ mensaje: "Error al almacenar los países" });
    }
}