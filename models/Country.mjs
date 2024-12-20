// models/Country.mjs
import mongoose from 'mongoose';

const CountrySchema = new mongoose.Schema({
  name: {
    common: String,
    official: String,
    nativeName: {
      spa: {
        official: String,
        common: String
      }
    }
  },
  independent: Boolean,
  status: String,
  unMember: Boolean,
  currencies: {
    [String]: {
      name: String,
      symbol: String
    }
  },
  capital: [String],
  region: String,
  subregion: String,
  languages: {
    spa: String
  },
  latlng: [Number],
  landlocked: Boolean,
  borders: [String],
  area: Number,
  flag: String,
  maps: {
    googleMaps: String,
    openStreetMaps: String
  },
  population: Number,
  gini: { type: Object, default: {} }, // Índice de Gini
  fifa: String,
  timezones: [String],
  continents: [String],
  flags: {
    png: String,
    svg: String,
    alt: String
  },
  startOfWeek: String,
  capitalInfo: {
    latlng: [Number]
  },
 
  creador: { type: String, default: 'Miguel Galvan' }
}, { collection: 'Paises'});

  const Country = mongoose.model('Paises', CountrySchema);


  async function testInsert() {
    try {
      const country = new Country({
        name: {
          common: 'Argentina',
          official: 'República Argentina',
          nativeName: { spa: { official: 'República Argentina', common: 'Argentina' } }
        },
        capital: ['Buenos Aires'],
        area: 2780400,
        population: 44938712,
        flag: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg',
        creador: 'Galvan Miguel'
      });
      
      await country.save();
      console.log('País guardado exitosamente');
    } catch (error) {
      console.error('Error al insertar el país:', error);
    }
  }
  
  testInsert();
  export default Country;

