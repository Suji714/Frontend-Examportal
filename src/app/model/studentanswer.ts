export class studentAnswers{
    questionId: number;
    selectedOption: string;
 
    constructor(
        questionId:number,
        selectedOption: string
    ){
        this.questionId=questionId;
        this.selectedOption=selectedOption;
    }
}
 
 