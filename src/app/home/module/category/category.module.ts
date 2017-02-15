import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"
import {CategoryRouting} from "./category.routing"
import {CategoryComponent} from "./category.component"
import {FlexLayoutModule} from "@angular/flex-layout"
import {ShareModule} from "../../../share"
import {PostPreviewComponent} from "./component/post-preview"
import {MdCardModule} from "@angular/material"
import {HomeShareModule} from "../share/share.module"

@NgModule({
	imports: [
		CommonModule,
		ShareModule,
		HomeShareModule,
		CategoryRouting,
		FlexLayoutModule,
    MdCardModule
	],
	declarations: [
		CategoryComponent,
    PostPreviewComponent
	]
})
export class CategoryModule {
}
