import { Injectable } from '@angular/core';

declare const io: any;
@Injectable()
export class CollaborationService {
  collaborationSocket: any;
  constructor() { }
  init(editor: any, sessionId: string): void{
    // window.location 是一个javascript的object，每个页面都有这个object。通过这个object，可以知道当前的server的endpoint的地址是什么 window.location.origin
    this.collaborationSocket = io(window.location.origin, {query: 'sessionId='+sessionId });

    // on method 会在client端接到server端发送的message之后调用
    // 可以用来测试client和server之间的链接是否建立成功
    this.collaborationSocket.on('change', (delta: string) =>{
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    // this.collaborationSocket.on('message', (message) => {
    //   console.log("message received from server: " + message);
    // });
  }
  // emit a change event to server and 
  // send the changed delta to server
  change(delta: string){
    this.collaborationSocket.emit('change', delta);
  }
  // emit a restoreBuffer event to server
  restoreBuffer(): void{
    this.collaborationSocket.emit('restoreBuffer');
  }

}
