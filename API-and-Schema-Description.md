## Shape Currently Expected by Front-End Module

```json
    {
      "id": "Number",
      "availability": [
        [{
          "dayOfWeek": "Number",
          "available": "Number",
          "day": "Number",
          "month": "Number",
        }],
      ],
      "maxGuests": "Number",
      "price": "Number",
      "serviceFee": "Number",
      "cleaningFee": "Number",
      "minStay": "Number",
    }
```

## Checkout Calendar API

All requests and responses are JSON objects

This endpoint is designed for two categories of users: renters and owners
Note: owner endpoints are not currently accessible by front-end module

### Get listing information and availability

-GET `/api/checkout-calendar/:listingId`

Returns an object containing:
1. information on listing
2. listing availability, represented as a nested array of months and days
3. an object containing data on reservations at this listing

**Success Status Code:** `200`

**Response Body Format:**

```json
    {
      "id": "Number",
      "availability": [
        [{
          "dayOfWeek": "Number",
          "available": "Number",
          "day": "Number",
          "month": "Number",
          "reservation_id": "Number"
        }],
      ],
      "maxGuests": "Number",
      "price": "Number",
      "serviceFee": "Number",
      "cleaningFee": "Number",
      "minStay": "Number",
      "owner": "String",
      "reservations": {
        "renterEmail": "String",
        "id": "Number",
        "check-in": "String",
        "check-out": "String",
        "numAdults": "Number",
        "numChildren": "Number",
        "numInfants": "Number",
        "totalCost": "Number"
      }
    }
```

</br>

### Owner creates a new listing

-POST `/api/checkout-calendar/owners/:listingId`

**Request Body:**

```json
    {
      "id": "Number",
      "availability": [
        [{
          "dayOfWeek": "Number",
          "available": "Number",
          "day": "Number",
          "month": "Number",
        }],
      ],
      "maxGuests": "Number",
      "price": "Number",
      "serviceFee": "Number",
      "cleaningFee": "Number",
      "minStay": "Number",
      "owner": "String"
    }
```

**Success Status Code:** `201`

**Response Body Format:**

```json
    {
      "message": "New listing created."
    }
```

```json
    {
      "message": "Failed to create new listing."
    }
```

</br>

### Owner updates an existing listing

-PATCH `/api/checkout-calendar/owners/:listingId`

**Request Body:**

```json
    {
      "id": "Number",
      "availability": [
        [{
          "dayOfWeek": "Number",
          "available": "Number",
          "day": "Number",
          "month": "Number",
        }],
      ],
      "maxGuests": "Number",
      "price": "Number",
      "serviceFee": "Number",
      "cleaningFee": "Number",
      "minStay": "Number",
      "owner": "String"
    }
```

**Success Status Code:** `201`

**Response Body Format:**

```json
    {
      "message": "Listing updated."
    }
```

```json
    {
      "message": "Failed to update listing."
    }
```

</br>

### Owner deletes listing

-DELETE `/api/listings/:listingId`

**Success Status Code:** `204`

**Response format:**

```json
    {
      "message": "Listing deleted."
    }
```

```json
    {
      "message": "Failed to delete listing."
    }
```

</br>

### Renter makes a new reservation

-POST `/api/checkout-calendar/renters/:listingId`

**Request Body:**

```json
    {
      "renterEmail": "String",
      "check-in": "String",
      "check-out": "String",
      "numAdults": "Number",
      "numChildren": "Number",
      "numInfants": "Number",
      "totalCost": "Number"
    }
```

**Success Status Code:** `201`

**Response Body Format:**

```json
    {
      "message": "New reservation created."
    }
```

```json
    {
      "message": "Failed to create new reservation."
    }
```

</br>

### Renter updates an existing reservation

-PATCH `/api/checkout-calendar/owners/:listingId/:reservationId`

**Request Body:**

```json
    {
      "renterEmail": "String",
      "check-in": "String",
      "check-out": "String",
      "numAdults": "Number",
      "numChildren": "Number",
      "numInfants": "Number",
      "totalCost": "Number"
    }
```

**Success Status Code:** `201`

**Response Body Format:**

```json
    {
      "message": "Reservation updated."
    }
```

```json
    {
      "message": "Failed to update reservation."
    }
```

</br>

### Renter deletes resrrvation

-DELETE `/api/listings/:listingId/:reservationId`

**Success Status Code:** `204`

**Response format:**

```json
    {
      "message": "Reservation deleted."
    }
```

```json
    {
      "message": "Failed to delete reservation."
    }
```
</br>

## Database Schema Diagram

<img src="/database/schemaDiagram.png">