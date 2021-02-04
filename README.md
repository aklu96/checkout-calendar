# Checkout Calendar

> Create a home listing page for a vacation rental application using a service based architecture. Focus on front end.

## Related Projects

  - https://github.com/the-casuals/casual-checkout-service
  - https://github.com/the-casuals/photo_carousel
  - https://github.com/the-casuals/reviews
  - https://github.com/the-casuals/photo_gallery

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> To run webpack, change webpack config mode to development or production according to needs then run
  npm run react-dev
> To start local server run npm start
> To seed database run npm run seed

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- ArangoDB
- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

</br>

## Checkout Calendar API

### Get listing information and availability

-GET `/api/listings/:listingId`

**Success Status Code:** `200`

**Returns:** JSON object containing information on listing, as well as nested array of months and days describing availability

```json
    {
      "id": "Number",
      "availability": [
        [{
          "dayOfWeek": "Number",
          "available": "Number",
          "day": "Number",
          "month": "Number",
          "renter": "String"
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

**Request Body**

```json
    {
      "id": "Number",
      "availability": [
        [{
          "dayOfWeek": "Number",
          "available": "Number",
          "day": "Number",
          "month": "Number",
          "renter": "String"
        }],
      ],
      "adults": "Number",
      "children": "Number",
      "infants": "Number",
    }
```

**Success Status Code:** `201`

### Response format:
* Returns: JSON

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

Note: Following endpoints are not supported by checkout calendar component.
Endpoints available for new Listing Owner component.

### Owner creates a new listing

-POST `/api/listings/:listingId`

**Request Body** A unique hash is created associated with the owner

```json
    {
      "id": "Number",
      "availability": [
        [{
          "dayOfWeek": "Number",
          "available": "Number",
          "day": "Number",
          "month": "Number",
          "renter": "String"
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

### Response format:
* Returns: JSON

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

### Response format:
* Returns: JSON

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