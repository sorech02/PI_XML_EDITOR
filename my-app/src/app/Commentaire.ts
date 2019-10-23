import { Personne } from './Personne'

export class Commentaire{
  [x: string]: any;
    //personne :Personne;
    commentaireTexte : String;
    id : Number;
    listCommentaires : string[];
    positiveLike: Number;
    negativeLike: Number;
    showCom : boolean;
}

export function showComment(){
        this.showCom = !this.showCom     
    }
