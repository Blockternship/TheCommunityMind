/**
 * Created by will on 19/09/18.
 */
export function handleQuestionAsked(event: QuestionAsked): void {

    let id = event.params.id.toHex();
    let userId = event.params.questioner.toHex();
    let question = event.params.question;

    let Question = new Entity();
    Question.setString('id', id);
    Question.setString('question', question);
    Question.setString('questioner', userId)

    let User = new Entity();
    User.setAddress('address', event.params.questioner as Address);

    store.set('User', userId, User);
    store.set('Question', id, Question);
}