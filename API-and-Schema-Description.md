## Checkout Calendar API

All requests and responses are JSON objects

### Get listing information and availability

-GET `/api/listings/:listingId`

Returns an object containing information on listing, as well as nested array of months and days describing availability

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
          "renter": {
            "id": "String",
            "adults": "Number",
            "children": "Number",
            "infants": "Number",
            "totalCost": "Number"
          }
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

</br>

### User rents listing; update availability

-PUT `/api/listings/:listingId`

The PUT request is used for Create, Update, and Delete operations from an availability perspective. A user can either rent a listing, update their existing dates, delete their reservation, or update their information. In either case, the request contains an updated availability array, as well as a unique hash attributed to the renter. Validation occurs on the frontend.

**Request Body Format:**

```json
    {
      "id": "Number",
      "availability": [
        [{
          "dayOfWeek": "Number",
          "available": "Number",
          "day": "Number",
          "month": "Number",
          "renter": {
            "id": "String",
            "adults": "Number",
            "children": "Number",
            "infants": "Number",
            "totalCost": "Number"
          }
        }],
      ],
    }
```

**Success Status Code:** `201`

**Response Body Format:**

```json
    {
      "message": "Successfully updated availability."
    }
```

```json
    {
      "message": "Failed to update availability."
    }
```

</br>

</br>

Note: Following endpoints are not supported by checkout calendar component.
Endpoints available for new Listing Owner component.

### Owner creates a new listing

-POST `/api/listings/:listingId`

**Request Body:** A unique hash is created associated with the owner

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