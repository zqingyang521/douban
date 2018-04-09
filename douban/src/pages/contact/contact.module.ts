import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';
import { ChatService } from "../../providers/chat/chat-service";
import { RelativeTime } from "../../pipes/relative-time";
import { EmojiPickerComponentModule } from "../../components/emoji-picker/emoji-picker.module";
import { EmojiProvider } from "../../providers/chat/emoji";
@NgModule({
    declarations: [
        ContactPage,
        RelativeTime
    ],
    imports: [
        EmojiPickerComponentModule,
        IonicPageModule.forChild(ContactPage),
    ],
    exports: [
        ContactPage
    ],
    providers: [
        ChatService,
        EmojiProvider
    ]
})
export class ContactPageModule { }