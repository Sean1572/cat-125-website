import soundfile2 from './XC425555 - Screaming Piha - Lipaugus vociferans.wav'
import soundfile3 from './XC552343 - Screaming Piha - Lipaugus vociferans.wav'
import soundfile4 from './XC591821 - Screaming Piha - Lipaugus vociferans.wav'
import soundfile5 from './XC591823 - Screaming Piha - Lipaugus vociferans.wav'
import soundfile6 from './XC610236 - Screaming Piha - Lipaugus vociferans (1).wav'
import soundfile7 from './610103__martian__street-building-front-door-code-beeps-door-open-close-rx.wav'
import soundfile8 from './124546__cubix__waterdrop.wav'
import soundfile9 from './376804__amholma__waves-up-close-2.wav'


/**
 * Citations
 * - init.wav
 *    - 
 *  
 * XC4255555.wav - Joshua Weiss
 * 
 * XC610236.wav -  Tom OShea
 * 
 * XC591823 / XC591821 - Mauricio Cuellar Ramirez (@Birding.travel)
 * 
 * XC552343 - 	Dante Buzzetti
 * 
 * https://freesound.org/people/martian/sounds/610103/
 * -   610103__martian__street-building-front-door-code-beeps-door-open-close-rx.wav
 *
 * https://freesound.org/people/cubix/sounds/124546/
 * 124546__cubix__waterdrop
 * 
 * https://freesound.org/people/amholma/sounds/376804/
 * 376804__amholma__waves-up-close-2
 * 
 */

 const data = [['https://cdn.download.ams.birds.cornell.edu/api/v1/asset/173621671/1200', false],
                ['https://drive.google.com/uc?id=1EPVoTfGAcgBSESSZ-AuwhRQxKmkDmSmP', false],
                ['https://drive.google.com/uc?id=1tRQSHZ-d-BRw1QXj8yb33frTyb0YX2RV', false],
                ['https://drive.google.com/uc?id=1JlFd8xPn8d6ntxuSYWw_qgVUddus8xaO', false],
                ['https://drive.google.com/uc?id=19ihu7W0KILr0hwXL0uVUhxwFDGgaE32J', false],
                ['https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg', false],
                ['https://cdn.pixabay.com/photo/2013/11/28/10/36/road-220058_960_720.jpg', false],
                ['https://cdn.pixabay.com/photo/2016/11/29/04/19/ocean-1867285_960_720.jpg', false],
                [soundfile2, true], [soundfile3, true],
                [soundfile4, true], [soundfile5, true], [soundfile6, true],
                [soundfile7, true], [soundfile8, true], [soundfile9, true]]


function getFiles(number) {
    let len = data.length
    let array = []
    let already_used = []
    let return_arr = []
    for (let i =0; i < len; i++) {
        array.push(i)
    }
    console.log(array, return_arr)
    for (let i =0; i < number; i++) {
        let insert = Math.floor(Math.random() * len)
        console.log("before", insert)
        while(already_used.indexOf(insert) != -1) {
            insert = Math.floor(Math.random() * len)
            continue;
        }
        console.log("after", insert)
        already_used.push(insert)
        //array = array.slice(array.indexOf(insert), array.indexOf(insert)+1)
        len = array.length
        return_arr.push(data[insert])
        console.log(array, return_arr)
    }
    console.log(return_arr)
    return return_arr //['https://pbs.twimg.com/profile_images/417319779943215104/gWMGH_Nx_400x400.jpeg', false], ['https://cdn.download.ams.birds.cornell.edu/api/v1/asset/173621671/1200', false]]
    //return //return_arr// 
}

export default getFiles;