// getting data 
const loadPhone = async (searchText='13') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phone = data.data;
    displayPhones(phone);
}
// display phone items 
const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    // display show-all-button if there are more than 12 phone items
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // display only first 12 phone
    phones = phones.slice(0, 12);

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-200 py-4 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Detail</button>
          </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner 
    toggleLoadingSpinner(false);
}
// handle search button 
const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
}
// loading spinner 
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}
// handle show detail button 
const handleShowDetail = async (id) => {
    
    // load single phone data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetail(phone);

}
// show phone detail 
const showPhoneDetail = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="" />
        <p><span class="font-bold">Storage: </span>${phone.mainFeatures.storage}</p>
        <p><span class="font-bold">Display Size: </span>${phone.mainFeatures.displaySize}</p>
        <p><span class="font-bold">Chipset: </span>${phone.mainFeatures.chipSet}</p>
        <p><span class="font-bold">Memory: </span>${phone.mainFeatures.memory}</p>
        <p><span class="font-bold">Slug: </span>${phone.slug}</p>
        <p><span class="font-bold">Release Data: </span>${phone?.releaseDate || 'Date not available'}</p>
        <p><span class="font-bold">Brand: </span>${phone.brand}</p>
        <p><span class="font-bold">GPS: </span>${phone.others?.GPS || 'No GPS available'}</p>
    `;
    // show the modal
    show_details_modal.showModal();
}

loadPhone();