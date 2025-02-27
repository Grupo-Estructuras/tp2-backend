import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { RestaurantData } from '../interface/restaurant';
import { TableData } from '../interface/table';
import { Reservation, ReservationData } from '../interface/reservation';
import { Client, ClientData } from '../interface/client';

@Injectable({
	providedIn: 'root'
})
export class RestaurantsService {
	private apiURL = 'http://localhost:3000/restaurants';
	constructor(private http: HttpClient) { }

	getRestaurants(): Observable<RestaurantData> {
		return this.http.get<RestaurantData>(this.apiURL);
	}
}

@Injectable({
	providedIn: 'root'
})
export class TablesService {
	private apiURL = 'http://localhost:3000/tables';
	constructor(private http: HttpClient) { }

	getTables(): Observable<TableData> {
		return this.http.get<TableData>(this.apiURL);
	}
}

@Injectable({
	providedIn: 'root'
})
export class TablesRestaurantService {
	private apiURL = 'http://localhost:3000/tables/';
	constructor(private http: HttpClient) { }

	async getTables(id: number): Promise<TableData> {
		return await lastValueFrom(this.http.get<TableData>(this.apiURL + String(id)));
	}
}

@Injectable({
	providedIn: 'root'
})
export class ReservationsRestaurantService {
	private apiURL = 'http://localhost:3000/reservations';
	constructor(private http: HttpClient) { }

	async getReservations(restaurantId: number, date: string): Promise<ReservationData> {
		return await lastValueFrom(this.http.get<ReservationData>(this.apiURL + "?restaurant=" + restaurantId + '&date=' + date));
	}

	postReservation(data: String): any {
		const options = { headers: { 'Content-Type': 'application/json' } };
		return this.http.post<Reservation>(this.apiURL, data, options).subscribe(
			(t: Reservation) => console.info(JSON.stringify(t))
		);
	}
}

@Injectable({
	providedIn: 'root'
})
export class ClientsService {
	private apiURL = 'http://localhost:3000/clients';
	constructor(private http: HttpClient) { }

	async getClients(): Promise<ClientData> {
		return await lastValueFrom(this.http.get<ClientData>(this.apiURL));
	}

	async postClient(data: String): Promise<Client> {
		const options = { headers: { 'Content-Type': 'application/json' } };
		return lastValueFrom(this.http.post<Client>(this.apiURL, data, options))
	}
}
