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

  isVisible = false;
  selectedCity;

  cities: Array<Object> = [
    {id: 0, name: 'Choose city...', title: 'Choose city...'},
    {id: '30.2711,-97.7437', title: 'Austin, TX'},
    {id: '42.3603,-71.0583', title: 'Boston, MA'},
    {id: '41.8756,-87.6244', title: 'Chicago, IL'},
    {id: '40.7720232,-73.9732319', title: 'New York City'},
    {id: '45.5202,-122.6742', title: 'Portland, OR'},
    {id: '37.779,-122.4199', title: 'San Francisco, CA'},
    {id: '47.6038,-122.3301', title: 'Seattle, WA'}
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
      this.selectedCity = args.selectedItem;
    }

    if (this.selectedCity.id === 0) {
      return;
    }

    let selectedCities: Array<any>;
    if (localStorage !== undefined) {
      selectedCities = JSON.parse(localStorage.getItem('selectedCities'));
    }
    if (selectedCities === null) {
      selectedCities = new Array<any>();
    }

    selectedCities.push({ key: this.selectedCity.id, label: this.selectedCity.title});

    if(localStorage !== undefined) {
      localStorage.setItem('selectedCities', JSON.stringify(selectedCities));
    }

    this.hide();
  }

  cancel() {
    this.hide();
  }
}
