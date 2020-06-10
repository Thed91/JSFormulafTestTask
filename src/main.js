document.addEventListener('DOMContentLoaded', function () {

    let topProductsList = [];
    let productList = [];

    async function getUsers(){
        return [{
            id: 1,
            gender: 1
        }, {
            id: 2,
            gender: 0
        },{
            id: 3,
            gender: 1
        },{
            id: 4,
            gender: 0
        }, {
            id: 5,
            gender: 1
        }];
    }

    async function getPreferences(userID){
       let result =[];
       const preferences = [{
               userID: 1,
               productsIDs: ['1a', '2b', '3c', '4d', '11l', '12m']
           }, {
               userID: 2,
               productsIDs: ['1a', '2b', '3c', '4d', '5e', '6f']
           }, {
               userID: 3,
               productsIDs: ['7g', '5e', '10k']
           }, {
               userID: 4,
               productsIDs: ['9j', '8h', '10k','3c', '11l']
           }, {
               userID: 5,
               productsIDs: ['2b']
           }
       ];
       await preferences.forEach(preference => {
           if (preference.userID === userID) {
               result = preference.productsIDs;
           }
       });
       return result;
    }

    async function getGenderPreferences(gender) {
        let result =[];
        const preferences = [{
            gender: 0,
            productsIDs: ['1a', '8h', '10k']
        }, {
            gender: 1,
            productsIDs: ['9j', '3c']
        }];

        await preferences.forEach(preference => {
            if (preference.gender === gender){
                result = preference.productsIDs;
            }
        });
        return result;
    }

    async function getTOPProducts(){
        let userList = [];

        await getUsers().then(users => {
            userList = users;
        });

        await userList.forEach(user => {
             getPreferences(user.id).then(prefs => {
                if(prefs.length < 5){
                    getGenderPreferences(user.gender).then(gPrefs => {
                        gPrefs.forEach(p => {
                            if(!prefs.includes(p) && prefs.length < 5){
                                prefs.push(p);
                            }
                        });
                        if(prefs.length >= 5){
                            setRating(prefs);
                            toSort();
                        }
                    });
                } else {
                   setRating(prefs);
                   toSort();
                }
            });
        });

        function setRating(prodList) {
            for (let i = 0; i < 4; i++) {
                let prodID = prodList[i];
                if(!productList.includes(prodID) && topProductsList.length <10){
                    productList.push(prodID);
                    topProductsList.push({
                        id:prodID,
                        rating: 1
                    })
                } else {
                    topProductsList.forEach(p => {
                        if(p.id === prodID){
                            p.rating++;
                        }
                    })
                }
            }
        }

        function toSort() {
            topProductsList.sort(function(a, b) {
                return b.rating - a.rating;
            });
        }

        return topProductsList;
    }

    // For testing!
    //
    // getTOPProducts().then(result => {
    //     console.log(result);
    // });
});


