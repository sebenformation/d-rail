// Application d.rail de location de vélo

let tabGpsVille = {
    "amiens"        : [49.8941708,2.2956951],
    "besancon"      : [47.2380222,6.0243622],
    "brisbane"      : [-27.4689682,153.0234991],
    "bruxelles"     : [50.8465573,4.351697],
    "cergy-pontoise": [49.0527528,2.0388736],
    "creteil"       : [48.7771486,2.4530731],
    "dublin"        : [53.3497645,-6.2602732],
    "lillestrom"    : [59.9534148,11.0451526],
    "ljubljana"     : [46.0499803,14.5068602],
    "lund"          : [55.7029296,13.1929449],
    "luxembourg"    : [49.8158683,6.1296751],
    "lyon"          : [45.7578137,4.8320114],
    "marseille"     : [43.2961743,5.3699525],
    "mulhouse"      : [47.7467,7.3389275],
    "namur"         : [50.4665284,4.8661892],
    "nancy"         : [48.6937223,6.1834097],
    "nantes"        : [47.2186371,-1.5541362],
    "rouen"         : [49.4404591,1.0939658],
    "santander"     : [43.4620412,-3.8099719],
    "seville"       : [37.3886303,-5.9953403],
    "toulouse"      : [43.6044622,1.4442469],
    "toyama"        : [36.6957569,137.2136215],
    "valence"       : [39.4697065,-0.3763353],
    "vilnius"       : [54.6870458,25.2829111],
};

const slider = new Slider(true);
const drailMap = new DrailMap("marseille", tabGpsVille["marseille"]);
