
(* f迭代n次，初值x *)
Fixpoint iter{T:Prop}(f:T->T)(n:nat)(x:T) :=
match n with
| O => x
| S n0 => f (iter f n0 x)
end.

(* 序数 *)
Inductive OnX {X:Prop}{cf:nat->Prop}:Prop :=
| Zero
| Suc(x0:OnX)
| Limω(f: nat->OnX)
| LimN(n: nat)(f: cf n->OnX)
| LimX(f: X->OnX).

(* 序数加法 *)
Definition OnAdd{X:Prop}{cf:nat->Prop}(a b:@OnX X cf): @OnX X cf.
induction b.
- apply a.
- apply (Suc IHb).
- apply (Limω H).
- apply (LimN _ H).
- apply (LimX H).
Defined.

(* 序数乘自然数 *)
Definition OnMuln{X:Prop}{cf:nat->Prop}(a:@OnX X cf)(b:nat): @OnX X cf :=
iter (OnAdd a) b Zero.

Definition OnXcode := prod Prop (nat->Prop).

Definition OnSuc(a:OnXcode):OnXcode :=
let (X,cf):=a in
let X' := @OnX X cf in
let cf' := fun n =>
  match n with
  | O => X
  | S n0 => cf n0
  end in
(X',cf').

Definition decode(a:OnXcode):Prop :=
let (X,cf):=a in
@OnX X cf.

Definition up(a:OnXcode)(x:decode a): decode (OnSuc a).
destruct a as [X cf].
unfold decode in x.
unfold decode.
cbn.
induction x.
- apply Zero.
- apply (Suc IHx).
- apply (Limω H).
- apply (LimN (S n) H).
- apply (LimN O H).
Defined.

Definition Ω(a:OnXcode): decode (OnSuc a).
pose proof (up a) as H.
destruct a as [X cf].
apply (LimX H).
Defined.

Definition ψ(a:OnXcode)(x0: decode a)(x:decode (OnSuc a)): decode a.
destruct a as [X cf].
unfold decode in x0,x.
unfold decode.
induction x.
- apply x0.
- apply (Limω (OnMuln IHx)).
- apply (Limω H).
- destruct n.
  + apply (LimX H).
  + apply (LimN _ H).
- apply (Limω (fun n => iter H n Zero)).
Defined.


Definition coden(n:nat):OnXcode.
induction n.
- apply (False,fun _=>False).
- apply (OnSuc IHn).
Defined.

Definition Ωn(n:nat): decode (coden n).
destruct n.
- apply (Suc Zero).
- apply (Ω (coden n)).
Defined.

Definition ψn(n:nat): decode (coden (S n)) -> decode (coden n) :=
ψ _ (Ωn n).

Definition ψ0ψn(n:nat): decode (coden (S n)) -> decode (coden O).
induction n.
- apply (ψn O).
- apply (fun z => IHn (ψn (S n) z)).
Defined.

Definition BOn(n:nat): decode (coden O) :=
 (ψ0ψn n (Ωn (S n))).