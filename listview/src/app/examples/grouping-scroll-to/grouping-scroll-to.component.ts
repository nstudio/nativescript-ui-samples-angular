import { Component, OnInit, ViewChild } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { RadListViewComponent } from "nativescript-ui-listview/angular";
import { DataItem } from "../dataItem";
import { DataItemService } from "../dataItem.service";

@Component({
    moduleId: module.id,
    selector: "tk-grouping-scroll-to.component",
    providers: [DataItemService],
    templateUrl: "grouping-scroll-to.component.html",
    styleUrls: ["grouping-scroll-to.component.css"]
})
export class ListViewDataOperationsGroupingScrollToComponent implements OnInit {
    private _dataItems: ObservableArray<DataItem>;
    private _isEnabled: boolean;
    private _myGroupingFunc: (item: any) => any;

    @ViewChild("myListView") myListViewComponent: RadListViewComponent;

    constructor(private _dataItemService: DataItemService) {
        this.myGroupingFunc = (item: DataItem) => {
            return item.category;
        };
        this.isEnabled = true;
    }

    get dataItems(): ObservableArray<DataItem> {
        return this._dataItems;
    }

    get isEnabled() {
        return this._isEnabled;
    }

    set isEnabled(value: boolean) {
        this._isEnabled = value;
    }

    get myGroupingFunc(): (item: any) => any {
        return this._myGroupingFunc;
    }

    set myGroupingFunc(value: (item: any) => any) {
        this._myGroupingFunc = value;
    }

    ngOnInit() {
        this._dataItems = new ObservableArray(this._dataItemService.getGroupedIndexOfSize(50));
    }

    public toggleGrouping() {
        let listView = this.myListViewComponent.listView;
        if (!listView.groupingFunction) {
            listView.groupingFunction = this.myGroupingFunc;
            this.isEnabled = true;
        } else {
            listView.groupingFunction = undefined;
            this.isEnabled = false;
        }
    }

    public onTap() {
        this.myListViewComponent.listView.scrollToIndex(1);
    }
}