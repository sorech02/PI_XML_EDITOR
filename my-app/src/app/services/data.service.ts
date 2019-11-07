export class DataService{
    
    datas = [
        {
            id:1, 
            data: new Data("Vaccin 1", ["link1", "link 2", "link 3"], "This is such a great description", "00515160")
        },
        {
            id:2,
            data: new Data("Vaccin 2", ["link1", "link 2", "link 3", "link 4", "link 5"], "This is such a great description", "00515160"),
        },
        {
            id:3,
            data: new Data("Vaccin 3", ["link1", "link 2", "link 3"], "This is such a great description", "005155160")
        },
        {
            id:4,
            data: new Data("Vaccin 4", ["link1", "link 2", "link 3"], "This is such a great description", "0051512160")
        },
        {
            id: 5,
            data: new Data("Vaccin 5", ["link1", "link 2", "link 3", "link 4",, "link 5", "link 6"], "This is such a great description", "00515160")
        },
        {
            id: 6,
            data: new Data("Vaccin 6", ["link1", "link 2", "link 3", "link 4"], "This is such a great description", "00515160")
        },
        {
            id: 7,
            data: new Data("Vaccin 7", ["link1", "link 2", "link 3", "link 4", "link 5", "link 6", "link 7"], "This is such a great description", "00515160")
        }
    ]

    getDataById(id:Number){
         
        const data = this.datas.find(
            (s) =>  {
                return s.id === id;
            }
        );
        return data;
    }

    getLinksByIndex(id: Number){
        const data = this.datas.find(
            (s) =>  {
                return s.id === id;
            }
        );
        return data.data.getLinks();
    }

    changeDataDescription(i: number, newDescription: string){
        this.datas[i].data.description = newDescription;
    }

    
}


class Data {

    label: string;
    links : any[];
    description: string;
    code: string;

    constructor(label: string, links: any[], description : string, code :string){
        this.label = label; 
        this.links = links; 
        this.description  = description; 
        this.code = code;
    }

    getLinks(){
        return this.links;
    }
}