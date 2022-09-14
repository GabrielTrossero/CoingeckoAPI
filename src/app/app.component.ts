import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoinsService } from './coins.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  coins: any[];
  filterCoins: any[];
  titles: string[];
  searchText: string;

  constructor(
    private httpClient: HttpClient,
    private coinsService: CoinsService
  ) {
    this.titles = ['#', 'Coin', 'Price', 'Price Change', '24h volume'];
  }

  //forma "antigua", sin usar servicios
  ngOnInitV1(): void {
    this.httpClient
      .get<any[]>(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .subscribe(
        (res) => {
          this.coins = res;
          this.filterCoins = res;
        },
        (err) => console.log(err)
      );
  }

  //forma correcta, usando servicios
  ngOnInit(): void {
    this.coinsService
      .getAll()
      .then((response) => {
        this.coins = response;
        this.filterCoins = response;
      })
      .catch((error) => console.log(error));
  }

  onChange() {
    this.filterCoins = this.coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
