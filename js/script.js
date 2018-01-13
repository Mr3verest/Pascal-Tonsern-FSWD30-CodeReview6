
// Constructor to create old and new items
class Collection {
	constructor (title, author, genre, publisher, type, imageUrl, rating) {
		this.title = title;
		this.author = author;
		this.genre = genre;
		this.publisher = publisher;
		this.type = type;
		this.imageUrl = imageUrl;
		this.rating = rating;
	}

	// Function to create an item
	createCard(){
		var collectionCard = $('<div></div>')
				.addClass("col-8 col-md-3 col-lg-2 col-sm-5 mx-auto py-3")
				.html(`
					<div class="card">
						<div class="card-title px-2">
							<span class="text-muted">Type:</span><strong>${this.type}</strong>
						</div>
			        	<img src=${this.imageUrl} alt="Image" style="object-fit:contain">
			    		<h5 class="px-2"><strong>${this.title}</strong></h5>
			        	<p class="px-2"><span class="text-muted ">Author:</span> <strong>${this.author}</strong></p>
			            <p class="px-2"><span class="text-muted">Published by:</span> <strong>${this.publisher}</strong></p>
			            <p class="px-2"><span class="text-muted">Genre:</span> <strong>${this.genre}</strong></p>
			            <p class="px-2"><span class="text-muted">Rating:</span> <strong>${stars(this.rating)}</strong></p>
			        </div> 
			        `);

    	$('#mainContent').append(collectionCard);
    }
}

// Creates items via the constructor
var content = [ new Collection ("Dylan", "Bob Dylan", "rock", "self published", "CD", "img/bobdylan.jpg", 4),
				new Collection ("City Lights", "Charlie Chaplin", "romantic comedy", "United Artists", "DVD", "img/citylights.jpg", 2),
				new Collection ("Diamond Life", "Sade", "smooth soul", "Epic", "CD", "img/diamondlife.jpg", 5),
				new Collection ("Woodwalkers", "Katja Brandis", "belletristik", "bild", "Book", "img/woodwalkers.jpg", 5),
				new Collection ("Foundation", "Isaac Asimov", "fantasy science fiction", "Heyne", "Book", "img/asimov.jpg", 3),
				new Collection ("The Sandman", "Neil Gaiman", "fantasy", "Vertigo", "DVD", "img/sandman.jpg", 2),
				new Collection ("Modesty Blaise", "Peter O'Donnell", "mystery", "Titan Books", "Book", "img/modesty.jpg", 3),
				new Collection ("Batman", "Marvel", "action", "Marvel Comics", "Comic", "img/Batman.jpg", 3),
				new Collection ("Daredevil vs Hitler", "Somebody", "comedy", "Random Comics", "Comic", "img/Daredevil.jpg", 3)
];

// Displays stored "old" data
for (var i = 0; i < content.length; i++) {
	content[i].createCard();
}

// On submit, adds items to collection
$("#title-form").on("submit", function(e){
	// Gets values from the form
	title = $("#title").val();
	author = $("#author").val();
	selectType = $("#selectType").val();
	selectGenre = $("#selectGenre").val();
	publisher = $("#publisher").val();
	image = $("#image").val();
	rating = Number($("#rating").val());
	
	// Checks the fields 
	if (title ==="" || author ==="" || selectType ==="disabled" || selectGenre ==="disabled" || publisher === "" || image ==="" || rating ===""){
		alert("Please fill all fields!");
		e.preventDefault();
	}else {
		// Checks the rating
		if (rating < 1 || rating > 5) {
			alert("Enter rating between 1-5!");
			e.preventDefault();
		}else {
			// Checks for forbidden authors
			if (author === "Danielle Steel" ||  author === "Roland Emmerich"){
				alert("I do not want to save this")
				e.preventDefault();
			} else {
				// Creates new collection
				var newContent = new Collection (title, author, selectGenre, publisher, selectType,'"'+image+'"', rating);
				newContent.createCard();
				alert("Item Added to collection");
				// Clears input
				clearFields();
			}
		}
		e.preventDefault();
	}
})


//  Empties input fields
function clearFields(){
	$("#title").val("");
	$("#author").val("");
	$("#selectType").val("disabled");
	$("#selectGenre").val("disabled");
	$("#publisher").val("");
	$("#image").val("");
	$("#rating").val("");
}

// Shows stars
function stars(rating) {
	var fullStar = "";
	for(var i = 0; i < rating; i++){
		fullStar += "<span class='fa fa-star checked'></span>";
	}
	var emptyStar = "";
	for(var j = 0; j < (5-rating); j++){
		emptyStar += "<span class='fa fa-star'></span>"
	}
	var myStars = fullStar + emptyStar;
	
	return(myStars);
}



