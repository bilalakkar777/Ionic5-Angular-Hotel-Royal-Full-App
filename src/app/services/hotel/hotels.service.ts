import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { Place } from '../../Model/place.model';
import { AuthService } from '../Authentication/auth.service';
import { PlaceLocation } from '../../Model/location.model';

interface PlaceData {
  userId: string;
  title: string;
//  short_description: string;
  description: string;
  price: number;
  avg: number;
  email: string;
  Website: string;
  mobile: number;
  star: number;
  availableFrom: Date;
  availableTo: Date;
  location: PlaceLocation;
  imageUrl: string;

}

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  private _places = new BehaviorSubject<Place[]>([]);

  get places() {
    return this._places.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  // Fetching hotels from a firebase link
  fetchPlaces() {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.get<{ [key: string]: PlaceData }>(
          `Link Data/test.json?auth=${token}`
        );
      }),
      map(resData => {
        const places = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            places.push(
              new Place(
                key,
                resData[key].userId,
                resData[key].title,
               // resData[key].short_description,
                resData[key].description,
                resData[key].price,
                resData[key].avg,
                resData[key].email,
                resData[key].Website,
                resData[key].mobile,
                resData[key].star,
                new Date(resData[key].availableFrom),
                new Date(resData[key].availableTo),
                resData[key].location,
                resData[key].imageUrl,

              )
            );
          }
        }
        return places;
        // return [];
      }),
      tap(places => {
        this._places.next(places);
      })
    );
  }

  // getting hotels from a firebase link

  getPlace(id: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.get<PlaceData>(
          `Link Data/test/${id}.json?auth=${token}`
        );
      }),
      map(placeData => {
        return new Place(
          id,
          placeData.userId,
          placeData.title,
        //  placeData.short_description,
          placeData.description,
          placeData.price,
          placeData.avg,
          placeData.email,
          placeData.Website,
          placeData.mobile,
          placeData.star,
          new Date(placeData.availableFrom),
          new Date(placeData.availableTo),
          placeData.location,
          placeData.imageUrl,

        );
      })
    );
  }
// for Upload Imgaes
  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);

    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.post<{ imageUrl: string; imagePath: string }>(
          'Link store Image',
          uploadData,
          { headers: { Authorization: 'Bearer ' + token } }
        );
      })
    );
  }
//-------------- to add new hotel 
  addhotel(
    title: string,
   // short_description: string,
    description: string,
    price: number,
    avg: number,
    email: string,
    Website: string,
    mobile: number,
    star: number,
    dateFrom: Date,
    dateTo: Date,
    location: PlaceLocation,
    imageUrl: string,
  ) {
    let generatedId: string;
    let fetchedUserId: string;
    let newPlace: Place;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap(token => {
        if (!fetchedUserId) {
          throw new Error('No user found!');
        }
        newPlace = new Place(
          Math.random().toString(),
          fetchedUserId,
          title,
        //  short_description,
          description,
          price,
          avg,
          email,
          Website,
          mobile,
          star,
          dateFrom,
          dateTo,
          location,
          imageUrl
        );
        return this.http.post<{ name: string }>(
          `Link Data/test.json?auth=${token}`,
          {
            ...newPlace,
            id: null
          }
        );
      }),
      switchMap(resData => {
        generatedId = resData.name;
        return this.places;
      }),
      take(1),
      tap(places => {
        newPlace.id = generatedId;
        this._places.next(places.concat(newPlace));
      })
    );
  }

//-------------- to  update hotel

  updatehotel(placeId: string, title: string, description: string, price: number, avg: number, email: string, Website: string, mobile: number, star: number) {
    let updatehotel: Place[];
    let fetchedToken: string;
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        fetchedToken = token;
        return this.places;
      }),
      take(1),
      switchMap(places => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
      }),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatehotel = [...places];
        const oldPlace = updatehotel[updatedPlaceIndex];
        updatehotel[updatedPlaceIndex] = new Place(
          oldPlace.id,
          oldPlace.userId,
          title,
          description,
          price,
          avg,
          email,
          Website,
          mobile,
          star,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.location,
          oldPlace.imageUrl,

        );
        return this.http.put(
          `Link Data/test/${placeId}.json?auth=${fetchedToken}`,
          { ...updatehotel[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._places.next(updatehotel);
      })
    );
  }
}
