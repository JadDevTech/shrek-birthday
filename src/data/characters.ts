export interface Character {
  id: string;
  nome: string;
  ruolo: string;
}

export const CHARACTERS: Character[] = [
  { id: 'orco',          nome: 'Shrek',                    ruolo: 'L\u2019Orco protagonista, padrone della palude' },
  { id: 'fiona',         nome: 'Principessa Fiona',        ruolo: 'La Principessa di Molto Molto Lontano' },
  { id: 'ciuchino',      nome: 'Ciuchino',                 ruolo: 'Il Migliore Amico Logorroico' },
  { id: 'gatto',         nome: 'Il Gatto con gli Stivali', ruolo: 'Spadaccino con Occhioni' },
  { id: 'farquaad',      nome: 'Lord Farquaad',            ruolo: 'Il Signore di Statura Modesta' },
  { id: 'drago',         nome: 'Drago',                    ruolo: 'Custode della Torre' },
  { id: 'gingy',         nome: 'Gingy',                    ruolo: 'Il Pan di Zenzero di Lord Farquaad' },
  { id: 'pinocchio',     nome: 'Pinocchio',                ruolo: 'Il Burattino Bugiardo' },
  { id: 'lupo',          nome: 'Il Lupo Cattivo',          ruolo: 'In Camicia da Notte' },
  { id: 'topo1',         nome: 'Topo Cieco I',             ruolo: 'Primo Topo della Triade' },
  { id: 'topo2',         nome: 'Topo Cieco II',            ruolo: 'Secondo Topo della Triade' },
  { id: 'topo3',         nome: 'Topo Cieco III',           ruolo: 'Terzo Topo della Triade' },
  { id: 'porcello1',     nome: 'Porcellino I',             ruolo: 'Casa di Paglia' },
  { id: 'porcello2',     nome: 'Porcellino II',            ruolo: 'Casa di Legno' },
  { id: 'porcello3',     nome: 'Porcellino III',           ruolo: 'Casa di Mattoni' },
  { id: 'fata',          nome: 'La Fata Madrina',          ruolo: 'Imprenditrice del Lieto Fine' },
  { id: 'azzurro',       nome: 'Principe Azzurro',         ruolo: 'Il Pretendente Ingombrante' },
  { id: 'harold',        nome: 'Re Harold',                ruolo: 'Il Sovrano di Molto Molto Lontano' },
  { id: 'lillian',       nome: 'Regina Lillian',           ruolo: 'La Regina Madre' },
  { id: 'artie',         nome: 'Artie',                    ruolo: 'L\u2019Erede Riluttante' },
  { id: 'merlino',       nome: 'Merlino',                  ruolo: 'Il Mago in Pensione' },
  { id: 'rumpel',        nome: 'Rumpelstiltskin',          ruolo: 'Il villain di Shrek e vissero felici e contenti' },
  { id: 'uncino',        nome: 'Capitan Uncino',           ruolo: 'Pirata Pianista' },
  { id: 'cappuccetto',   nome: 'Cappuccetto Rosso',        ruolo: 'Sospettosa di Lupi' },
  { id: 'doris',         nome: 'Doris',                    ruolo: 'La Sorellastra Brutta (di buon cuore)' },
  { id: 'mongo',         nome: 'Mongo',                    ruolo: 'Pan di Zenzero Gigantesco' },
  { id: 'cenerentola',   nome: 'Cenerentola',              ruolo: 'Della Scarpetta di Cristallo' },
  { id: 'biancaneve',    nome: 'Biancaneve',               ruolo: 'Della Mela e dei Sette Nani' },
  { id: 'bella',         nome: 'Bella Addormentata',       ruolo: 'Sempre un po\u2019 stanca' },
  { id: 'raperonzolo',   nome: 'Raperonzolo',              ruolo: 'Della Lunga Treccia' },
  { id: 'humpty',        nome: 'Humpty Dumpty',             ruolo: 'L\u2019Uovo Avventuriero' },
  { id: 'kitty',         nome: 'Kitty Zampe di Velluto',    ruolo: 'La Gatta Spadaccina' },
  { id: 'specchio',      nome: 'Specchio Magico',           ruolo: 'Il Riflesso della Verit\u00e0' },
  { id: 'robin',         nome: 'Robin Hood',                ruolo: 'Il Ladro Gentiluomo della Foresta' },
  { id: 'altro',         nome: 'Altro',                     ruolo: 'Scegli il tuo personaggio!' }
];
