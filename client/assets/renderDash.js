//factory to create an object for each match the user has.
function MatchObjFactory(match) {
    var returnObj = {};
    //start of: match object parameters
    returnObj.id = match._id;
    returnObj.name = match.person.name;
    returnObj.age = getAge(match.person.birth_date.substring(0, 10));
    returnObj.gender = binaryToGender(match.person.gender);
    returnObj.bio = match.person.bio.trim();
    returnObj.birthDay = new Date(match.person.birth_date);
    var monthOfBirth = parseInt(match.person.birth_date.substring(5, 7));
    var dayOfBirth = parseInt(match.person.birth_date.substring(8, 10));
    returnObj.astrologicalSign = horoscope.getSign(monthOfBirth, dayOfBirth);
    returnObj.lastActive = new Date(match.person.ping_time);
    returnObj.total_days_on_Tinder = getDifferenceInDaysBetween(new Date(match.created_date), new Date(match.person.ping_time));
    returnObj.acctCreatedOn = new Date(match.created_date);
    returnObj.lastInteraction = new Date(match.last_activity_date);
    returnObj.total_interaction_time_in_days = getDifferenceInDaysBetween(new Date(match.created_date), new Date(match.last_activity_date));

    returnObj.SuperLike = match.is_super_like;
    returnObj.numberOfPhotos = match.person.photos.length;
    returnObj.photosArray = match.person.photos.map(function (photo) {
        return photo.url;
    });
    //start of sentimentPercent
    var sentimentWordArray = _.flatten(match.messages.map(function (mess) {
        return mess.message.split(" ").map(function (word) {
            return sentiment(word).score;
        });
    })).filter(function (word) {
        return word !== 0;
    }); //creates an array of sentiment values for words that aren't neutral

    var sentimentValueTotal = sentimentWordArray.reduce(function (total, curr) {
        return total + curr;
    }, 0);
    var sentimentPercent = sentimentValueTotal / sentimentWordArray.length;
    sentimentPercent += 5; //changes range from (-5, 5) to (0, 10)
    sentimentPercent *= 10; //changes range from (0, 10) to (0, 100)
    returnObj.sentimentPercent = sentimentPercent.toFixed(2);
    //end of sentimentPercent
    returnObj.numberOfTotalMessages = match.messages.length;
    returnObj.messagesSentFromThem = match.messages.reduce(function (total, currMessage) {
        // checks if the message is from your match
        if (currMessage.from === match.person._id) {
            total += 1;
            return total;
        } else {
            return total;
        }
    }, 0);
    returnObj.messagesSentFromYou = match.messages.reduce(function (total, currMessage) {
        // checks if the message is from your match
        if (currMessage.from === match.person._id) {
            return total;
        } else {
            total += 1;
            return total;
        }
    }, 0);
    returnObj.messageObjects = match.messages.map(function (msg) {
        return {
            sender: msg.from.split().map(function (sender) {
                if (sender === match.person._id) {
                    return match.person.name;
                } else {
                    return "You";
                }
            }).join(),
            sentDate: new Date(msg.sent_date),
            message: msg.message,
            msgSentiment_comparative: sentiment(msg.message).comparative

        };
    });
    return returnObj;
    //end of: match object parameters
}
//gets Age from birthdate
//http://stackoverflow.com/questions/10008050/get-age-from-birthdate
function getAge(dateString) {
    'use strict';
    var today = new Date(),
        birthDate = new Date(dateString),
        age = today.getFullYear() - birthDate.getFullYear(),
        m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age -= 1;
    }
    return age;
}
// tinder assigns Male's zero and Female's zero.
function binaryToGender(matchGenderNumber) {
    'use strict';
    return (matchGenderNumber) ? "Female" : "Male";
}
//gets difference between two date objects
function getDifferenceInDaysBetween(date1, date2) {
    'use strict';
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
}
