import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-city-picker',
  templateUrl: './city-picker.component.html',
  styleUrls: ['./city-picker.component.scss'],
  providers: []
})
export class CityPickerComponent implements OnInit {
  @Output() closePicker: EventEmitter<any> = new EventEmitter();
  @ViewChild('dialogcontainer') dialogContainer: ElementRef;

  isVisible: boolean = false;
  selectedCity;

  cities:Array<Object> = [
    {id: 0, name: "Choose city...", title: "Choose city..."},
    {id: 2357536, title: "Austin, TX"},
    {id: 2367105, title: "Boston, MA"},
    {id: 2379574, title: "Chicago, IL"},
    {id: 2459115, title: "New York, NY"},
    {id: 2475687, title: "Portland, OR"},
    {id: 2487956, title: "San Francisco, CA"},
    {id: 2490383, title: "Seattle, WA"}
  ];

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
    this.closePicker.emit();
  }

  saveCity(args) {
    if (args !== undefined) {
      // This handles the {N} filtered list picker (not used on the web)
      this.selectedCity = args.selectedItem
    }

    if (this.selectedCity.id === 0) {
      return;
    }

    let selectedCities = JSON.parse(localStorage.getItem("selectedCities"));
    if (selectedCities === null) { 
      selectedCities = new Array<any>();
    }
    
    selectedCities.push({ key: this.selectedCity.id, label: this.selectedCity.title});
    
    localStorage.setItem("selectedCities", JSON.stringify(selectedCities));

    this.hide();
  }

  cancel() {
    this.hide();
  }
}