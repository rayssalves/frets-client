export const selectRoom = (state) => state.chat.room;
export const selectAuthor = (state) => state.chat.author;
export const selectReceiver = (state) => {return {id: state.chat.receiverId, name: state.chat.receiverName}};
export const selectMessages = (state) => state.chat.messages;