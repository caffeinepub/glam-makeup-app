import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Order "mo:core/Order";

actor {
  type Category = {
    #eyes;
    #lips;
    #face;
    #skincare;
  };

  type MakeupLook = {
    id : Nat;
    title : Text;
    category : Category;
    creator : Text;
    tags : [Text];
    likes : Nat;
    created : Time.Time;
  };

  module MakeupLook {
    public func compare(look1 : MakeupLook, look2 : MakeupLook) : Order.Order {
      Nat.compare(look1.id, look2.id);
    };
  };

  type Tutorial = {
    title : Text;
    duration : Nat; // in minutes
  };

  var nextLookId = 3;

  let looks = Map.fromIter<Nat, MakeupLook>([(1, {
    id = 1;
    title = "Smokey Eyes";
    category = #eyes;
    creator = "Jane Doe";
    tags = ["smokey", "night", "dramatic"];
    likes = 0;
    created = Time.now();
  }), (2, {
    id = 2;
    title = "Glowing Skin";
    category = #skincare;
    creator = "Alice Smith";
    tags = ["natural", "glow", "hydration"];
    likes = 3;
    created = Time.now();
  })].values());

  let tutorials = Map.fromIter<Nat, Tutorial>([(1, {
    title = "Contouring Basics";
    duration = 15;
  }), (2, {
    title = "Perfect Red Lip";
    duration = 8;
  })].values());

  public shared ({ caller }) func addLook(title : Text, category : Category, creator : Text, tags : [Text]) : async Nat {
    let id = nextLookId;
    let newLook : MakeupLook = {
      id;
      title;
      category;
      creator;
      tags;
      likes = 0;
      created = Time.now();
    };
    looks.add(id, newLook);
    nextLookId += 1;
    id;
  };

  public shared ({ caller }) func likeLook(id : Nat) : async () {
    switch (looks.get(id)) {
      case (null) { Runtime.trap("Makeup look not found") };
      case (?look) {
        let updatedLook = {
          id = look.id;
          title = look.title;
          category = look.category;
          creator = look.creator;
          tags = look.tags;
          likes = look.likes + 1;
          created = look.created;
        };
        looks.add(id, updatedLook);
      };
    };
  };

  public query ({ caller }) func getAllLooks() : async [MakeupLook] {
    looks.values().toArray().sort();
  };

  public query ({ caller }) func getLooksByCategory(category : Category) : async [MakeupLook] {
    looks.values().toArray().filter(func(look) { look.category == category });
  };

  public query ({ caller }) func getAllTutorials() : async [Tutorial] {
    tutorials.values().toArray();
  };

  public query ({ caller }) func searchLooksByTag(tag : Text) : async [MakeupLook] {
    looks.values().toArray().filter(
      func(look) {
        look.tags.find(func(t) { t.contains(#text tag) }) != null;
      }
    );
  };
};
