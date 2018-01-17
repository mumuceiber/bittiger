import { Component, OnInit } from '@angular/core';
import { CollaborationService } from "../../services/collaboration.service";
import { DataService } from "../../services/data.service";
import { ActivatedRoute } from '@angular/router';

declare const ace: any;
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  sessionId: string;
  languages: string[] = ['Java', 'Python'];
  language: string = 'Java';
  editor: any;
  defaultContent = {
    'Java': `public class Solution{
      public static void main(String[] args){
        // Type your code here
      }
    }`,
    'Python': `class Solution:
    def example():
      # Write your code here`
  };
  output: string;
  constructor(private collaborationService: CollaborationService,
              private route: ActivatedRoute,
              private dataService: DataService ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sessionId = params['id'];
      this.initEditor();
      this.collaborationService.restoreBuffer();
    });
  }
  initEditor(): void{
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();
    // set up collaboration socket
    this.collaborationService.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;
    // register change callback
    this.editor.on('change', (e)=>{
      console.log('editor change: ' + JSON.stringify(e));
      if(this.editor.lastAppliedChange != e){
        this.collaborationService.change(JSON.stringify(e));
      }
  });

  }
  setLanguage(language: string): void{
    this.language = language;
    this.resetEditor();
  }
  resetEditor(): void{
    this.editor.getSession().setMode("ace/mode/"+this.language.toLowerCase());
    this.editor.setValue(this.defaultContent[this.language]);
  }
  submit(): void{
    const userCodes = this.editor.getValue();
    const data = {
      'userCodes': userCodes,
      'lang': this.language.toLowerCase()
    };
    this.dataService.buildAndRun(data)
    .then(res => {
      this.output = res.text;
      console.log(this.output);
    });
  }
}
