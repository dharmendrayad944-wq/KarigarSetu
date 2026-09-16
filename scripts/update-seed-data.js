const fs = require('fs');

const attributionData = {
  'prod-dokra-01': {
    image: '/crafts/bastar-dhokra.jpg',
    author: 'Saiphani02',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dhokra_item_Raodeo.jpg',
    craftGiUrl: 'https://www.ipindia.gov.in/geographical-indications-track-application-list-of-registered-geographical-indications-and-authorised-users-part-a-register-list-of-registered-gi-of-india'
  },
  'prod-blue-pottery-02': {
    image: '/crafts/jaipur-blue-pottery.jpg',
    author: 'Neek-Theri',
    license: 'CC BY-SA 4.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Jaipur_Blue_Pottery_Vase_with_Raja-Rani_Design.jpg',
    craftGiUrl: 'https://www.ipindia.gov.in/geographical-indications-track-application-list-of-registered-geographical-indications-and-authorised-users-part-a-register-list-of-registered-gi-of-india'
  },
  'prod-madhubani-03': {
    image: '/crafts/madhubani-painting.jpg',
    author: 'Rohini',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Jadupatua_paintings_and_Madhubani_paintings.JPG',
    craftGiUrl: 'https://www.ipindia.gov.in/geographical-indications-track-application-list-of-registered-geographical-indications-and-authorised-users-part-a-register-list-of-registered-gi-of-india'
  },
  'prod-channapatna-04': {
    image: '/crafts/channapatna-toys.jpg',
    author: 'HPNadig',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Channapatna-toys.jpg',
    craftGiUrl: 'https://www.ipindia.gov.in/geographical-indications-track-application-list-of-registered-geographical-indications-and-authorised-users-part-a-register-list-of-registered-gi-of-india'
  },
  'prod-banarasi-05': {
    image: '/crafts/banarasi-silk.jpg',
    author: 'Ekabhishek',
    license: 'CC BY-SA 3.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Saree_on_display_at_Dilli_Haat.JPG',
    craftGiUrl: 'https://www.ipindia.gov.in/geographical-indications-track-application-list-of-registered-geographical-indications-and-authorised-users-part-a-register-list-of-registered-gi-of-india'
  },
  'prod-kutch-06': {
    image: '/crafts/kutch-embroidery.jpg',
    author: 'Indianapolis Museum of Art',
    license: 'Public Domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Woman%27s_shirt_from_Kutch,_Gujarat,_India,_IMA_55114.jpg',
    craftGiUrl: 'https://www.ipindia.gov.in/geographical-indications-track-application-list-of-registered-geographical-indications-and-authorised-users-part-a-register-list-of-registered-gi-of-india'
  },
  'prod-pattachitra-07': {
    image: '/crafts/pattachitra.jpg',
    author: 'Mike Prince',
    license: 'CC BY 2.0',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pattachitra_Painting_(16419912954).jpg',
    craftGiUrl: 'https://www.ipindia.gov.in/geographical-indications-track-application-list-of-registered-geographical-indications-and-authorised-users-part-a-register-list-of-registered-gi-of-india'
  },
  'prod-kashmiri-08': {
    image: '/crafts/kashmiri-papier-mache.jpg',
    author: 'Los Angeles County Museum of Art',
    license: 'Public Domain',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pen_Box_(qalamdan)_LACMA_M.89.160a-b.jpg',
    craftGiUrl: 'https://www.ipindia.gov.in/geographical-indications-track-application-list-of-registered-geographical-indications-and-authorised-users-part-a-register-list-of-registered-gi-of-india'
  }
};

console.log('Attribution mapping ready for', Object.keys(attributionData).length, 'products');
