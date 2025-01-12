## Directory Structure

<details><summary>Directory Structure (implementing now 25/01/12)</summary>

```sh
src
|-- ./App.css
|-- ./App.tsx
|-- ./assets
| `-- ./assets/react.svg
|-- ./domains
|   |-- ./domains/about
|   |   `-- ./domains/about/About.tsx
| |-- ./domains/authentication
| | |-- ./domains/authentication/Authentication.tsx
| | `-- ./domains/authentication/components
|   |       `-- ./domains/authentication/components/authForm.tsx
| |-- ./domains/common
| | |-- ./domains/common/Footer
| | | |-- ./domains/common/Footer/Footer.stories.ts
| | | `-- ./domains/common/Footer/Footer.tsx
|   |   |-- ./domains/common/Header
|   |   |   |-- ./domains/common/Header/Header.stories.ts
|   |   |   |-- ./domains/common/Header/Header.tsx
|   |   |   `-- ./domains/common/Header/components
| | | `-- ./domains/common/Header/components/burgerMenu
|   |   |           `-- ./domains/common/Header/components/burgerMenu/BurgerMenu.tsx
| | |-- ./domains/common/constants
| | | `-- ./domains/common/constants/index.ts
|   |   `-- ./domains/common/notFound
| | `-- ./domains/common/notFound/NotFound.tsx
|   |-- ./domains/discover
|   |   |-- ./domains/discover/Discover
|   |   |   |-- ./domains/discover/Discover/Discover.stories.ts
|   |   |   |-- ./domains/discover/Discover/Discover.tsx
|   |   |   `-- ./domains/discover/Discover/type.ts
| | `-- ./domains/discover/components
|   |       |-- ./domains/discover/components/EateryCard
|   |       |   |-- ./domains/discover/components/EateryCard/EateryCard.stories.ts
|   |       |   |-- ./domains/discover/components/EateryCard/EateryCard.tsx
|   |       |   `-- ./domains/discover/components/EateryCard/type.ts
| | `-- ./domains/discover/components/LeafletMap
|   |           |-- ./domains/discover/components/LeafletMap/LeafletMap.tsx
|   |           `-- ./domains/discover/components/LeafletMap/leaflet
| | `-- ./domains/discover/components/LeafletMap/leaflet/leaflet.css
|   |-- ./domains/eateryDetail
|   |   |-- ./domains/eateryDetail/EateryDetail
|   |   |   |-- ./domains/eateryDetail/EateryDetail/EateryDetail.stories.ts
|   |   |   `-- ./domains/eateryDetail/EateryDetail/EateryDetail.tsx
| | `-- ./domains/eateryDetail/components
|   |       |-- ./domains/eateryDetail/components/EateryInfo
|   |       |   |-- ./domains/eateryDetail/components/EateryInfo/EateryInfo.stories.tsx
|   |       |   |-- ./domains/eateryDetail/components/EateryInfo/EateryInfo.tsx
|   |       |   `-- ./domains/eateryDetail/components/EateryInfo/type.ts
| | |-- ./domains/eateryDetail/components/EateryLocation
| | | |-- ./domains/eateryDetail/components/EateryLocation/EateryLocation.stories.tsx
| | | |-- ./domains/eateryDetail/components/EateryLocation/EateryLocation.tsx
| | | |-- ./domains/eateryDetail/components/EateryLocation/leaflet
| | | | `-- ./domains/eateryDetail/components/EateryLocation/leaflet/leaflet.css
|   |       |   `-- ./domains/eateryDetail/components/EateryLocation/type.ts
| | |-- ./domains/eateryDetail/components/EateryTitle
| | | |-- ./domains/eateryDetail/components/EateryTitle/EateryTitle.stories.tsx
| | | |-- ./domains/eateryDetail/components/EateryTitle/EateryTitle.tsx
| | | `-- ./domains/eateryDetail/components/EateryTitle/type.ts
|   |       |-- ./domains/eateryDetail/components/EatryReviews
|   |       |   `-- ./domains/eateryDetail/components/EatryReviews/EateryReviews.tsx
| | `-- ./domains/eateryDetail/components/ImgDisplay
|   |           |-- ./domains/eateryDetail/components/ImgDisplay/ImgDisplay.stories.tsx
|   |           |-- ./domains/eateryDetail/components/ImgDisplay/ImgDisplay.tsx
|   |           `-- ./domains/eateryDetail/components/ImgDisplay/type.ts
| |-- ./domains/home
| | |-- ./domains/home/Home.tsx
| | `-- ./domains/home/constants
|   |       `-- ./domains/home/constants/index.ts
| |-- ./domains/sampleData
| | `-- ./domains/sampleData/index.ts
|   `-- ./domains/shareForm
| |-- ./domains/shareForm/ShareForm.tsx
| |-- ./domains/shareForm/components
| | |-- ./domains/shareForm/components/businessHourInput
| | | `-- ./domains/shareForm/components/businessHourInput/businessHourInput.tsx
|       |   |-- ./domains/shareForm/components/categorySelect
|       |   |   `-- ./domains/shareForm/components/categorySelect/CategorySelect.tsx
| | |-- ./domains/shareForm/components/descriptionTextarea
| | | `-- ./domains/shareForm/components/descriptionTextarea/descriptionTextarea.tsx
|       |   |-- ./domains/shareForm/components/imageInput
|       |   |   `-- ./domains/shareForm/components/imageInput/ImageInput.tsx
| | |-- ./domains/shareForm/components/leafletForm
| | | |-- ./domains/shareForm/components/leafletForm/LeafletMap
| | | | |-- ./domains/shareForm/components/leafletForm/LeafletMap/LeafletMap.stories.tsx
| | | | |-- ./domains/shareForm/components/leafletForm/LeafletMap/LeafletMap.tsx
| | | | `-- ./domains/shareForm/components/leafletForm/LeafletMap/leaflet
|       |   |   |       `-- ./domains/shareForm/components/leafletForm/LeafletMap/leaflet/leaflet.css
| | | `-- ./domains/shareForm/components/leafletForm/leafletForm.tsx
|       |   |-- ./domains/shareForm/components/nameInput
|       |   |   `-- ./domains/shareForm/components/nameInput/NameInput.tsx
| | |-- ./domains/shareForm/components/regularHolidays
| | | `-- ./domains/shareForm/components/regularHolidays/regularHolidays.tsx
|       |   `-- ./domains/shareForm/components/type.ts
| `-- ./domains/shareForm/shareForm.stories.tsx
|-- ./index.css
|-- ./lib
|   |-- ./lib/jsonGenTemplate.txt
|   `-- ./lib/utils.ts
|-- ./main.tsx
|-- ./shadcn
| `-- ./shadcn/ui
|       |-- ./shadcn/ui/alert-dialog.tsx
|       |-- ./shadcn/ui/button.tsx
|       |-- ./shadcn/ui/card.tsx
|       |-- ./shadcn/ui/checkbox.tsx
|       |-- ./shadcn/ui/dropdown-menu.tsx
|       |-- ./shadcn/ui/form.tsx
|       |-- ./shadcn/ui/input.tsx
|       |-- ./shadcn/ui/label.tsx
|       |-- ./shadcn/ui/select.tsx
|       |-- ./shadcn/ui/skeleton.tsx
|       `-- ./shadcn/ui/textarea.tsx
`-- ./vite-env.d.ts

```

</details>
